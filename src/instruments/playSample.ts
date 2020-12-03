import audioCtx from '../utils/audioContext';

let audioBuffer: AudioBuffer[];

export const playKickSample = () => {
  const sampleSource = audioCtx.createBufferSource();
  sampleSource.buffer = audioBuffer[0];
  sampleSource.playbackRate.setValueAtTime(1, audioCtx.currentTime);
  sampleSource.connect(audioCtx.destination)
  sampleSource.start();
  return sampleSource;
}

export const playSnareSample = () => {
  const sampleSource = audioCtx.createBufferSource();
  sampleSource.buffer = audioBuffer[1];
  sampleSource.playbackRate.setValueAtTime(1, audioCtx.currentTime);
  sampleSource.connect(audioCtx.destination)
  sampleSource.start();
  return sampleSource;
}

export const setSamples = (audioSamples: AudioBuffer[]) => {
  audioBuffer = audioSamples;
}