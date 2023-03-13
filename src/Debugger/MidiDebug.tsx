import { Card, Grid } from '@mui/material'
import { useContext, useEffect } from 'react'
import { MidiContext } from '../Context/MidiProvider'
import midiNoteToString from '../util/midiNoteToString'

import { chord } from 'tonal-detect'

export default function MidiDebug() {

  const context = useContext(MidiContext)

  function listInputs(inputs) {
    const input = inputs.value
    console.log("Input port : [ type:'" + input.type + "' id: '" + input.id + "' manufacturer: '" + input.manufacturer + "' name: '" + input.name + "' version: '" + input.version + "']")
  }

  const pressedNotes = context.keys.map((key) =>
    <Grid item xs={2}><h2>{midiNoteToString(key)}</h2>{key}</Grid>
  );

  const currentChords = () => {
    let chords = chord(context.keys.map(midiNoteToString))
    console.log("chords", chords)

    // normal chords are called '[key]64' for some reason
    let cleanedUpChords = chords.map((chord) => { return chord.replace('64', '')})

    console.log("cleaned up chords", cleanedUpChords)


    return cleanedUpChords.map((chord) => {
      return (<Grid item xs={2}><p>{chord}</p></Grid>)
    })
  }
  return (

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card variant="outlined">
          <h1>Notes Pressed</h1>
          <Grid container>
            {
              pressedNotes
            }
          </Grid>
          {/* <h1>Chords</h1>
          <Grid container>
            { currentChords() }
          </Grid> */}
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined">
          <h1>Inputs</h1>
          {context.midi.inputs.map((input) =>
            <p>{input}</p>
          )}
        </Card>

      </Grid>
    </Grid>
  )
}
