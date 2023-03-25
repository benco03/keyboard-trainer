import { useContext, useEffect, useState } from "react";
import { MidiContext } from "../Context/MidiProvider";
import { midiToNote } from "../util/midiNoteConverters";
import './PianoFlex.css';

export function Key(props) {

    const context = useContext(MidiContext)

    const [stringValue, setStringValue] = useState('');
    const [className, setClassName] = useState('');

    useEffect(() => {

        let calculateClassName = (keyValue) => {
            let stringVal = midiToNote(keyValue);
            let colourClass = (stringVal.includes('#') ? 'black' : 'white') + '-key'
            let highlighted = context.keys.includes(keyValue)
            return colourClass + '' + (highlighted ? ' highlighted' : '')
        }

        let newStringVal = midiToNote(props.keyValue)
        let newClassName = calculateClassName(props.keyValue)
        setStringValue(newStringVal)
        setClassName(newClassName)
    }, [context.keys, props.keyValue])


    return (
        <div id={props.keyValue + "-" + stringValue} className={className}>
            <div className='text'>{stringValue}</div>
        </div>
    )
}