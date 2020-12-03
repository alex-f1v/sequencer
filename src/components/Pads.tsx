import React, { useState } from 'react';
import { Container, Grid, Slider, Typography } from '@material-ui/core';
import Pad from './Pad';
import {
  updateNoiseParameters,
  updatePulseParameters,
  updateSweepParameters,
} from '../instruments';

type Props = {
  padMapOnChange?: any;
  currentBeat?: number;
}

const Pads = (props: Props) => {
  const [padMap, setPadMap] = useState<any>([]);

  // sweep
  const [attackValue, setAttackValue] = useState<number>(0.2);
  const [releaseValue, setReleaseValue] = useState<number>(0.5);
  const handleAttackChange = (event: any, newValue: number | number[]) => {
    setAttackValue(newValue as number);
    updateSweepParameters(newValue as number, releaseValue);
  };

  const handleReleaseChange = (event: any, newValue: number | number[]) => {
    setReleaseValue(newValue as number);
    updateSweepParameters(attackValue, newValue as number);
  };

  // pulse
  const [pulseHzValue, setPulseHzValue] = useState<number>(880);
  const [lfoHzValue, setLfoHzValue] = useState<number>(30);
  const handlePulseHzChange = (event: any, newValue: number | number[]) => {
    setPulseHzValue(newValue as number);
    updatePulseParameters(newValue as number, lfoHzValue);
  };

  const handleLFOHzChange = (event: any, newValue: number | number[]) => {
    setLfoHzValue(newValue as number);
    updatePulseParameters(pulseHzValue, newValue as number);
  };

  // noise
  const [noiseDurationValue, setNoiseDurationValue] = useState<number>(1);
  const [bandPassHzValue, setBandPassHzValue] = useState<number>(1000);
  const handleNoiseDurationChange = (event: any, newValue: number | number[]) => {
    setNoiseDurationValue(newValue as number);
    updateNoiseParameters(newValue as number, bandPassHzValue);
  };

  const handleBandPassHzChange = (event: any, newValue: number | number[]) => {
    setBandPassHzValue(newValue as number);
    updateNoiseParameters(noiseDurationValue, newValue as number);
  };

  const onCheckPad = (id: string) => {
    const newState = padMap.includes(id) ?
      padMap.filter((pad: any) => pad !== id)
      : [...padMap, id];

    setPadMap(newState);

    props.padMapOnChange(newState);
  }

  return (
    <Container>
      <Grid item>
        <Grid container>
          <Grid item>
            <Typography id="continuous-slider" gutterBottom>
              Sweep
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography id="continuous-slider" gutterBottom>
                Attack Time
              </Typography>
              <Slider
                aria-labelledby="discrete-slider-small-steps"
                step={0.1}
                marks
                min={0}
                max={1}
                value={attackValue}
                valueLabelDisplay="auto"
                onChange={handleAttackChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography id="continuous-slider" gutterBottom>
                Release Time
            </Typography>
              <Slider
                aria-labelledby="discrete-slider-small-steps"
                step={0.1}
                marks
                min={0}
                max={1}
                value={releaseValue}
                onChange={handleReleaseChange}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
          <Pad id="sweep-pad-0" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
          <Pad id="sweep-pad-1" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
          <Pad id="sweep-pad-2" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
          <Pad id="sweep-pad-3" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography id="continuous-slider" gutterBottom>
              Pulse Hz
              </Typography>
            <Slider
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={660}
              max={1320}
              value={pulseHzValue}
              valueLabelDisplay="auto"
              onChange={handlePulseHzChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography id="continuous-slider" gutterBottom>
              LFO Hz
            </Typography>
            <Slider
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={20}
              max={40}
              value={lfoHzValue}
              onChange={handleLFOHzChange}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
        <Pad id="pulse-pad-0" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="pulse-pad-1" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="pulse-pad-2" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="pulse-pad-3" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography id="continuous-slider" gutterBottom>
              Noise Duration
            </Typography>
            <Slider
              aria-labelledby="discrete-slider-small-steps"
              step={0.1}
              marks
              min={0.1}
              max={2}
              value={noiseDurationValue}
              valueLabelDisplay="auto"
              onChange={handleNoiseDurationChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography id="continuous-slider" gutterBottom>
              BandPass Hz
            </Typography>
            <Slider
              aria-labelledby="discrete-slider-small-steps"
              step={5}
              marks
              min={400}
              max={1200}
              value={bandPassHzValue}
              onChange={handleBandPassHzChange}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
        <Pad id="noise-pad-0" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="noise-pad-1" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="noise-pad-2" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="noise-pad-3" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
      </Grid>
      <Grid item>
        <Pad id="sample-pad-kick-0" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="sample-pad-kick-1" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="sample-pad-kick-2" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="sample-pad-kick-3" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
      </Grid>
      <Grid item>
        <Pad id="sample-pad-snare-0" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="sample-pad-snare-1" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="sample-pad-snare-2" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
        <Pad id="sample-pad-snare-3" onCheckPad={onCheckPad} currentBeat={props.currentBeat} />
      </Grid>
    </Container>
  );
}

export default Pads;