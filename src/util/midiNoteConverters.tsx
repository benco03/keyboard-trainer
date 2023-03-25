export function midiToNote(note) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const index = (note - 36) % 12;
    return notes[index];
}

export function midiToNoteAndOctave(midiNum) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor((midiNum - 12) / 12);
    const noteIndex = midiNum % 12;
    const noteName = noteNames[noteIndex];
    return noteName + octave;
  }