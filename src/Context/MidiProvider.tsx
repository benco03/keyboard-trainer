import { createContext, useEffect, useState } from "react";

export const MidiContext = createContext({keys: [], midi: {inputs: []}});

export function MidiProvider({ children }) {

    const [keys, setKeys] = useState([])
    const [midi, setMidi] = useState({inputs: []})


    function onMIDIFailure(e) {
        console.log("No access to MIDI devices or your browser doesn't support WebMIDI API." + e)
    }

    useEffect(() => {
        function onMIDIMessage(event) {
            console.debug("MIDI in state", midi)
            console.debug('MIDI data', event)
            var data = event.data
            //var cmd = data[0] >> 4
            //var channel = data[0] & 0xf
            var type = data[0] & 0xf0
            var note = data[1]
            //var velocity = data[2]

            switch (type) {
                case 144: // noteOn message
                    setKeys(oldKeys => {
                        return [...oldKeys, note].sort()
                    })
                    break
                case 128: // noteOff message
                    setKeys(oldKeys => {
                        return oldKeys.filter(item => item !== note)
                    })
                    break
            }
        }

        function onMIDISuccess(midiAccess) {
            console.log("Midi connected",  midiAccess.inputs.values())
            const inputs = midiAccess.inputs.values()
            const inputNames = []
            for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                let connected = input.value.state === 'connected' ? '* ' : ''
                inputNames.push(connected + input.value.manufacturer + ' ' + input.value.name)
                input.value.onmidimessage = onMIDIMessage
            }
            setMidi({...midi, inputs: inputNames})
        }

        console.log("KeyProvider mounted")
        navigator.requestMIDIAccess({
            sysex: false
        }).then(onMIDISuccess, onMIDIFailure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
    )

    return (
        <MidiContext.Provider value={{keys: keys, midi: midi}}>
            {children}
        </MidiContext.Provider>
    )
}