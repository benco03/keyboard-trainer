import { Card, Grid } from '@mui/material'
import { useContext } from 'react'
import { MidiContext } from '../Context/MidiProvider'
import { midiToNote } from '../util/midiNoteConverters'

export default function MidiDebug() {

  const context = useContext(MidiContext)

  const pressedNotes = context.keys.map((key) =>
    <Grid item xs={2}><h2>{midiToNote(key)}</h2>{key}</Grid>
  );


  return (

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card variant="outlined">
          <h1>Notes Pressed</h1>
          <Grid container>
            {pressedNotes}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined">
          <h1>Inputs</h1>
          {context.midi.inputs.map((input) =>
            <p key={input.toString()}>{input}</p>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}
