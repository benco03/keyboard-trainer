import { Key } from "./Key"
import './PianoFlex.css'
export function Octave(props) {

    const midiStart = props.midiStart

    return (
        <div className='octave'>
            <Key keyValue={midiStart}></Key>
            <Key keyValue={midiStart + 1}></Key>
            <Key keyValue={midiStart + 2}></Key>
            <Key keyValue={midiStart + 3}></Key>
            <Key keyValue={midiStart + 4}></Key>
            <Key keyValue={midiStart + 5}></Key>
            <Key keyValue={midiStart + 6}></Key>
            <Key keyValue={midiStart + 7}></Key>
            <Key keyValue={midiStart + 8}></Key>
            <Key keyValue={midiStart + 9}></Key>
            <Key keyValue={midiStart + 10}></Key>
            <Key keyValue={midiStart + 11}></Key>
        </div>
    )
}