import { Octave } from './Octave';
import './PianoFlex.css';
import { useContext, useEffect, useState } from 'react';

import * as Tone from 'tone'
import { MidiContext } from '../Context/MidiProvider';

import { midiToNoteAndOctave } from '../util/midiNoteConverters';
import { synth as ConfiguredSynth } from './Synth'
function Piano(props) {

  const context = useContext(MidiContext)

  const [permissionGranted, setPermissionGranted] = useState(false)

  const [synth, setSynth] = useState(undefined)

  useEffect(() => {
    if (synth === undefined) {
      Tone.start()
      setSynth(ConfiguredSynth)
    } else {
      if (permissionGranted) {
        synth.releaseAll(0)
      let newState = []
      context.keys.forEach(key => {
        let newNote = midiToNoteAndOctave(key)
        console.log("new note", newNote)
        newState.push(newNote)
      });

      synth.triggerAttack(newState)
      }
    }
  }, [context.keys, synth, permissionGranted])


      if (!permissionGranted) {
        return (
        <div>
          <button onClick={async () => {
            await Tone.start()
            setPermissionGranted(true)
            synth.releaseAll(0)
            }}>Connect</button>
        </div>
        )
      } else {
        return (<div className='piano-container'>
        <Octave midiStart={36} />
        <Octave midiStart={48} />
        <Octave midiStart={60} />
        <Octave midiStart={72} />
      </div>)
      }
    }

export default Piano;