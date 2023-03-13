export default function midiNoteToString(note) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const index = (note - 36) % 12;
    return notes[index];
}