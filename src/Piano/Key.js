import { useContext, useEffect, useState } from "react";
import { MidiContext } from "../../Context/MidiProvider";
import midiNoteToString from "../../util/midiNoteToString";
import './PianoFlex.css';

export function Key(props) {

    const context = useContext(MidiContext)

    const [stringValue, setStringValue] = useState('');
    const [className, setClassName] = useState('');


    let calculateClassName = (keyValue) => {
        let stringVal = midiNoteToString(keyValue);
        let colourClass = (stringVal.includes('#') ? 'black' : 'white') + '-key'
        let highlighted = context.keys.includes(keyValue)
        return colourClass + '' + (highlighted ? ' highlighted' : '')
    }

    useEffect(() => {
        let newStringVal = midiNoteToString(props.keyValue)
        let newClassName = calculateClassName(props.keyValue)
        setStringValue(newStringVal)
        setClassName(newClassName)
    }, [context.keys])


    return (
        <div id={props.keyValue + "-" + stringValue} class={className}>
            <div class='text'>{stringValue}</div>
        </div>
    )
}