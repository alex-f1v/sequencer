import React, { useEffect, useRef, useState } from 'react';
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
  setSamples,
} from '../instruments';
import loadSamples from '../utils/loadSamples';
import {
  scheduler,
  stop,
  resetCounters,
  updatePadMap,
  updateTempo,
  notesInQueue,
} from '../utils/scheduler';

import Pads from '../components/Pads';

import audioCtx from '../utils/audioContext';


const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function Home() {

  const requestRef = useRef<number>(0);

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tempoValue, setTempoValue] = useState<number>(60);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [beat, setBeat] = useState<number | undefined>(undefined);

  const handleTempoChange = (event: any, newValue: number | number[]) => {
    setTempoValue(newValue as number);
    updateTempo(newValue as number);
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const padMapOnChange = (mapping: any[]) => {
    updatePadMap(mapping);
  }

  let lastNoteDrawn = 3;
  const beatProgressAnimation = () => {
    let drawNote = lastNoteDrawn;
    // console.log('beatProgressAnimation', drawNote);
    const currentTime = audioCtx.currentTime;
    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
      drawNote = notesInQueue[0].note;
      notesInQueue.splice(0, 1);   // remove note from queue
      setBeat(drawNote);
    }
    // We only need to draw if the note has moved.
    if (lastNoteDrawn !== drawNote) {
      lastNoteDrawn = drawNote;
    }
    // set up to draw again
    requestRef.current = requestAnimationFrame(beatProgressAnimation);
  }

  /**
   * Run on page load
   */
  useEffect(() => {
    loadSamples().then((allSamples) => {
      setSamples(allSamples);
      setIsLoading(false);
    });
    updateSweepParameters(0.2, 0.5);
    updatePulseParameters(880, 30);
    updateNoiseParameters(1, 1000);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      resetCounters();
      audioCtx.state === 'suspended' && audioCtx.resume();
      scheduler();
      requestAnimationFrame(beatProgressAnimation);
    } else {
      stop();
      cancelAnimationFrame(requestRef.current);
      setBeat(undefined);
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
            <Pads currentBeat={beat} padMapOnChange={padMapOnChange}></Pads>
          </div>
        )}
    </Container>
  );
}

export default Home;