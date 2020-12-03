// for cross browser compatibility
const AudioContext = window.AudioContext ||
  // @ts-ignore Property 'webkitAudioContext' does not exist on type 'Window & typeof globalThis'.ts(2339)
  window.webkitAudioContext;
const audioCtx = new AudioContext();

export default audioCtx;