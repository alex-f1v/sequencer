import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  CircularProgress,
  Grid,
  makeStyles,
  Slider,
  Theme,
  Typography
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import {
  updateNoiseParameters,
  updatePulseParameters,
  updateSweepParameters,
  selectSample,
} from '../instruments';
import loadSamples from '../utils/loadSamples';
import {
  scheduler,
  stop,
  resetCounters,
} from '../utils/scheduler';

import audioCtx from '../utils/audioContext';


const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [samplesValue, setSamplesValue] = useState<AudioBuffer[] | null>(null);

  const [attackValue, setAttackValue] = useState<number>(0.2);
  const [releaseValue, setReleaseValue] = useState<number>(0.5);

  const [pulseHzValue, setPulseHzValue] = useState<number>(880);
  const [lfoHzValue, setLfoHzValue] = useState<number>(30);

  const [noiseDurationValue, setNoiseDurationValue] = useState<number>(1);
  const [bandPassHzValue, setBandPassHzValue] = useState<number>(1000);

  const [tempoValue, setTempoValue] = useState<number>(60);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleAttackChange = (event: any, newValue: number | number[]) => {
    setAttackValue(newValue as number);
    updateSweepParameters(newValue as number, releaseValue);
  };

  const handleReleaseChange = (event: any, newValue: number | number[]) => {
    setReleaseValue(newValue as number);
    updateSweepParameters(attackValue, newValue as number);
  };

  const handlePulseHzChange = (event: any, newValue: number | number[]) => {
    setPulseHzValue(newValue as number);
    updatePulseParameters(newValue as number, lfoHzValue);
  };

  const handleLFOHzChange = (event: any, newValue: number | number[]) => {
    setLfoHzValue(newValue as number);
    updatePulseParameters(pulseHzValue, newValue as number);
  };

  const handleNoiseDurationChange = (event: any, newValue: number | number[]) => {
    setNoiseDurationValue(newValue as number);
    updateNoiseParameters(newValue as number, bandPassHzValue);
  };

  const handleBandPassHzChange = (event: any, newValue: number | number[]) => {
    setBandPassHzValue(newValue as number);
    updateNoiseParameters(noiseDurationValue, newValue as number);
  };

  const handleTempoChange = (event: any, newValue: number | number[]) => {
    setTempoValue(newValue as number);
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Run on page load
   */
  useEffect(() => {
    loadSamples().then((allSamples) => {
      setSamplesValue(allSamples);
      setIsLoading(false);
      selectSample(allSamples[0]);
    });
    updateSweepParameters(attackValue, releaseValue);
    updatePulseParameters(pulseHzValue, lfoHzValue);
    updateNoiseParameters(noiseDurationValue, bandPassHzValue);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      resetCounters();
      audioCtx.state === 'suspended' && audioCtx.resume();
      scheduler();
    } else {
      stop();
    }
  }, [isPlaying]);

  return (
    <Container component="main" className={classes.main} maxWidth="lg">
      {isLoading ? (
        <CircularProgress />
      ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              endIcon={isPlaying ? (
                <Icon>stop</Icon>
              ) : (
                  <Icon>play_arrow</Icon>
                )
              }
              onClick={handlePlayClick}
            >
              {isPlaying ? (
                'Stop'
              ) : (
                  'Play'
                )}
            </Button>
            <Typography id="continuous-slider" gutterBottom>
              Attack Time
            </Typography>
            <Grid item xs={6}>
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
            <Typography id="continuous-slider" gutterBottom>
              Release Time
            </Typography>
            <Grid item xs={6}>
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
            <Typography id="continuous-slider" gutterBottom>
              Pulse Hz
            </Typography>
            <Grid item xs={6}>
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
            <Typography id="continuous-slider" gutterBottom>
              LFO Hz
            </Typography>
            <Grid item xs={6}>
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
            <Typography id="continuous-slider" gutterBottom>
              Noise Duration
            </Typography>
            <Grid item xs={6}>
              <Slider
                aria-labelledby="discrete-slider-small-steps"
                step={0.1}
                marks
                min={0}
                max={2}
                value={noiseDurationValue}
                valueLabelDisplay="auto"
                onChange={handleNoiseDurationChange}
              />
            </Grid>
            <Typography id="continuous-slider" gutterBottom>
              BandPass Hz
            </Typography>
            <Grid item xs={6}>
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
            <Typography id="continuous-slider" gutterBottom>
              Tempo
            </Typography>
            <Grid item xs={6}>
              <Slider
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks
                min={10}
                max={250}
                value={tempoValue}
                onChange={handleTempoChange}
                valueLabelDisplay="auto"
              />
            </Grid>
          </div>
        )}
    </Container>
  );
}

export default Home;