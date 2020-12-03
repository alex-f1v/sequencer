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
    yellow: {
      borderColor: '#000',
      backgroundColor: '#FFCF01',
      '&:hover': {
        backgroundColor: '#FFCF01',
      },
    },
    white: {
      backgroundColor: '#FFF',
      '&:hover': {
        backgroundColor: '#FFF',
      },
    }
  }),
);

const Pad = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const classes = useStyles();

  const handleCheck = () => {
    setChecked(!checked);
    props.onCheckPad(props.id, checked);
  };

  return (
    <ColorButton
      className={classNames(classes.margin, checked ? classes.yellow : classes.white)}
      // @ts-ignore
      onClick={handleCheck} />
  );
}

export default Pad;