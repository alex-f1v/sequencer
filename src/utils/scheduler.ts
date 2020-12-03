import audioCtx from './audioContext';
import { playNoise, playPulse, playSweep, playKickSample, playSnareSample } from '../instruments';

// USER UPDATE VALUES
let padMap: any = [];
let tempo = 60;

// RESET WHEN STARTING
let currentNote = 0;
let nextNoteTime = 0.0; // when the next note is due.

let lookahead = 8.0;
let scheduleAheadTime = 0.1;

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


export const notesInQueue: any = [];

function scheduleNote(beatNumber: number, time: number) {
  // console.log(new Date().getTime() / 1000);
  // push the note on the queue, even if we're not playing.
  notesInQueue.push({ note: beatNumber, time: time });
  if (padMap.includes(`sweep-pad-${currentNote}`)) {
    playSweep();
  }
  if (padMap.includes(`pulse-pad-${currentNote}`)) {
    playPulse();
  }
  if (padMap.includes(`noise-pad-${currentNote}`)) {
    playNoise();
  }
  if (padMap.includes(`sample-pad-kick-${currentNote}`)) {
    playKickSample();
  }
  if (padMap.includes(`sample-pad-snare-${currentNote}`)) {
    playSnareSample();
  }
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

// UPDATE VALUES
export const resetCounters = () => {
  currentNote = 0;
  nextNoteTime = audioCtx.currentTime;
};

export const stop = () => window.clearTimeout(timerID);

export const updatePadMap = (map: any) => padMap = map;

export const updateTempo = (bpm: number) => tempo = bpm;