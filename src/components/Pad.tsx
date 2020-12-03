import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import classNames from 'classnames';

type Props = {
  onCheckPad?: any;
  id: string;
  currentBeat?: number;
}

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    border: '10px solid #FFCF01',
    height: '9vw',
    width: '9vw',
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    white: {
      backgroundColor: '#FFF',
      '&:hover': {
        backgroundColor: '#FFF',
      },
    },
    yellow: {
      borderColor: '#000',
      backgroundColor: '#FFCF01',
      '&:hover': {
        backgroundColor: '#FFCF01',
      },
    },
  }),
);

const Pad = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const classes = useStyles();

  const isCurrentBeatPad = () => props.id.includes(`${props.currentBeat}`);

  const handleCheck = () => {
    setChecked(!checked);
    props.onCheckPad(props.id);
  };

  const classList = classNames(
    classes.margin,
    checked ? classes.yellow : classes.white,
    isCurrentBeatPad() && classes.yellow
  )

  return (
    <ColorButton
      className={classNames(classList)}
      // @ts-ignore
      onClick={handleCheck} />
  );
}

export default Pad;