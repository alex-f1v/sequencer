import audioCtx from '../utils/audioContext';

let pulseTime = 1;
let pulseHz: number = 0;
let lfoHz: number = 0;

export const playPulse = () => {
    let osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pulseHz, audioCtx.currentTime);

    let amp = audioCtx.createGain();
    amp.gain.setValueAtTime(1, audioCtx.currentTime);

    let lfo = audioCtx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.setValueAtTime(lfoHz, audioCtx.currentTime);

    lfo.connect(amp.gain);
    osc.connect(amp).connect(audioCtx.destination);
    lfo.start();
    osc.start();
    osc.stop(audioCtx.currentTime + pulseTime);
}

export const updatePulseParameters = (pulse: number, lfo: number) => {
    pulseHz = pulse;
    lfoHz = lfo;
  }