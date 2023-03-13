import { Octave } from './Octave';
import './PianoFlex.css';

function Piano(props) {

  return (
    <div className='piano-container'>
      <Octave midiStart={36} />
      <Octave midiStart={48} />
      <Octave midiStart={60} />
      <Octave midiStart={72} />
    </div>

  );
}

export default Piano;