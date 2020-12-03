import audioCtx from './audioContext';

import samples from '../audio';

async function getFile(filepath: string) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export default async function loadSamples() {
  let loadedSamples = [];
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    loadedSamples.push(await getFile(sample));
  }
  return loadedSamples;
}