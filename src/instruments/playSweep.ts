import audioCtx from '../utils/audioContext';
import wavetable from '../waveforms/wavetable';

let wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);
let sweepLength = 1;

let attackTime: number = 0;
let releaseTime: number = 0;

export const playSweep = () => {
  let osc = audioCtx.createOscillator();
  osc.setPeriodicWave(wave);
  osc.frequency.value = 220;

  let sweepEnv = audioCtx.createGain();
  sweepEnv.gain.cancelScheduledValues(audioCtx.currentTime);
  sweepEnv.gain.setValueAtTime(0, audioCtx.currentTime);
  // set our attack
  sweepEnv.gain.linearRampToValueAtTime(1, audioCtx.currentTime + attackTime);
  // set our release
  // 1
  sweepEnv.gain.linearRampToValueAtTime(0, audioCtx.currentTime + sweepLength + releaseTime);

  osc.connect(sweepEnv).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + sweepLength);
}

export const updateSweepParameters = (attack: number, release: number) => {
  attackTime = attack;
  releaseTime = release;
}