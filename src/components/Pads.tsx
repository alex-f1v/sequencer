import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Pad from './Pad';

type Props = {
  padMapOnChange?: any;
}

const Pads = (props: Props) => {
  const [padMap, setPadMap] = useState<any>([]);

  const onCheckPad = (id: string, checked: boolean) => {
    const newState = padMap.includes(id) ?
      padMap.filter((pad: any) => pad !== id)
      : [...padMap, id];

    setPadMap(newState);

    props.padMapOnChange(newState);
  }

  return (
    <Container>
      <Grid item xs={6}>
        <Pad id="sweep-pad-0" onCheckPad={onCheckPad} />
        <Pad id="sweep-pad-1" onCheckPad={onCheckPad} />
        <Pad id="sweep-pad-2" onCheckPad={onCheckPad} />
        <Pad id="sweep-pad-3" onCheckPad={onCheckPad} />
      </Grid>
      <Grid item xs={6}>
        <Pad id="pulse-pad-0" onCheckPad={onCheckPad} />
        <Pad id="pulse-pad-1" onCheckPad={onCheckPad} />
        <Pad id="pulse-pad-2" onCheckPad={onCheckPad} />
        <Pad id="pulse-pad-3" onCheckPad={onCheckPad} />
      </Grid>
      <Grid item xs={6}>
        <Pad id="noise-pad-0" onCheckPad={onCheckPad} />
        <Pad id="noise-pad-1" onCheckPad={onCheckPad} />
        <Pad id="noise-pad-2" onCheckPad={onCheckPad} />
        <Pad id="noise-pad-3" onCheckPad={onCheckPad} />
      </Grid>
      <Grid item xs={6}>
        <Pad id="sample-pad-0" onCheckPad={onCheckPad} />
        <Pad id="sample-pad-1" onCheckPad={onCheckPad} />
        <Pad id="sample-pad-2" onCheckPad={onCheckPad} />
        <Pad id="sample-pad-3" onCheckPad={onCheckPad} />
      </Grid>
    </Container>
  );
}

export default Pads;
