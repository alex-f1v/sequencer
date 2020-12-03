import audioCtx from '../utils/audioContext';

let noiseDuration: number = 0;
let bandPassHz: number = 0;
export const playNoise = () => {
  const bufferSize = audioCtx.sampleRate * noiseDuration; // set the time of the note
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate); // create an empty buffer
  let data = buffer.getChannelData(0); // get data

  // fill the buffer with noise
  for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
  }

  // create a buffer source for our created data
  let noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  let bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = bandPassHz;

  // connect our graph
  noise.connect(bandpass).connect(audioCtx.destination);
  noise.start();
}

export const updateNoiseParameters = (duration: number, bandPassFreq: number) => {
  noiseDuration = duration;
  bandPassHz = bandPassFreq;
}