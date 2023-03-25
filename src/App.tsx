import './App.css';
import Piano from './Piano/Piano';
import Challenger from './Challenger/Challenger';
import MidiDebug from './Debugger/MidiDebug';
import { MidiProvider } from './Context/MidiProvider';
import { Container, Grid } from '@mui/material';


function App() {

  return (
    <MidiProvider >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Piano />
          </Grid>
          <Grid item xs={12}>
            <MidiDebug />
          </Grid>
          <Grid item xs={12}>
            <Challenger />
          </Grid>
        </Grid>
      </Container>
    </MidiProvider>
  );
}

export default App;
