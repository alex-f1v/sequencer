import audioCtx from '../utils/audioContext';

let audioBuffer: AudioBuffer;

export const playSample = () => {
  const sampleSource = audioCtx.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.playbackRate.setValueAtTime(1, audioCtx.currentTime);
  sampleSource.connect(audioCtx.destination)
  sampleSource.start();
  return sampleSource;
}

export const selectSample = (audioSample: AudioBuffer) => {
  audioBuffer = audioSample;
}