import audioCtx from './audioContext';
import { playNoise, playPulse, playSweep, playSample } from '../instruments';

let lookahead = 8.0;
let scheduleAheadTime = 0.1;

let currentNote = 0;
let nextNoteTime = 0.0; // when the next note is due.

let tempo = 60;

export const nextNote = () => {
  const secondsPerBeat = 60.0 / tempo;
  // Add beat length to last beat time
  nextNoteTime += secondsPerBeat;
  // Advance the beat number, wrap to zero
  currentNote++;
  if (currentNote === 4) {
    currentNote = 0;
  }
}


const notesInQueue = [];

function scheduleNote(beatNumber: number, time: number) {
  // console.log(new Date().getTime() / 1000);
  // push the note on the queue, even if we're not playing.
  notesInQueue.push({ note: beatNumber, time: time });

  // if (pads[0].querySelectorAll('button')[currentNote].getAttribute('aria-checked') === 'true') {
  // playSweep();
  // }
  // if (pads[1].querySelectorAll('button')[currentNote].getAttribute('aria-checked') === 'true') {
  // playPulse()
  // }
  // if (pads[2].querySelectorAll('button')[currentNote].getAttribute('aria-checked') === 'true') {
  // playNoise()
  // }
  // if (pads[3].querySelectorAll('button')[currentNote].getAttribute('aria-checked') === 'true') {
  playSample();
  // }
}

let timerID: number | undefined;
export const scheduler = () => {
  // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    scheduleNote(currentNote, nextNoteTime);
    nextNote();
  }
  timerID = window.setTimeout(scheduler, lookahead);
}

export const resetCounters = () => {
  currentNote = 0;
  nextNoteTime = audioCtx.currentTime;
};

export const stop = () => window.clearTimeout(timerID);


// let lastNoteDrawn = 3;

// function draw() {
//     let drawNote = lastNoteDrawn;
//     let currentTime = audioCtx.currentTime;

//     while (notesInQueue.length && notesInQueue[0].time < currentTime) {
//         drawNote = notesInQueue[0].note;
//         notesInQueue.splice(0,1);   // remove note from queue
//     }

//     // We only need to draw if the note has moved.
//     if (lastNoteDrawn != drawNote) {
//         pads.forEach(function(el, i) {
//             el.children[lastNoteDrawn].style.borderColor = 'hsla(0, 0%, 10%, 1)';
//             el.children[drawNote].style.borderColor = 'hsla(49, 99%, 50%, 1)';
//         });

//         lastNoteDrawn = drawNote;
//     }
//     // set up to draw again
//     requestAnimationFrame(draw);
// }