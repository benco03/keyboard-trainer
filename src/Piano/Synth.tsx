import * as Tone from 'tone'


export const synth = new Tone.PolySynth(Tone.Synth, {
    envelope: {
      attack: 0.005,
      attackCurve: "linear",
      decay: 0.1,
      decayCurve: "exponential",
      release: 1,
      releaseCurve: "exponential",
      sustain: 0.3
    },
    oscillator: {
      partialCount: 0,
      phase: 0,
      type: "sine"
    }
  }).toDestination();