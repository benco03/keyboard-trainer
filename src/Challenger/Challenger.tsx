import { Card, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import * as Chord from "tonal-chord"
import * as Note from "tonal-note"
import { MidiContext } from "../Context/MidiProvider";
import midiNoteToString from "../util/midiNoteToString";


export default function Challenger({props}) {

    const context = useContext(MidiContext)
    
    const [completedCount, setCompletedCount] = useState(0)
    const [currentChallenge, setCurrentChallenge] = useState("");

    useEffect(() => {
        if (currentChallenge === "") {
            setCurrentChallenge(getChallenge())
        }

        checkChallenge()
    }, [context.keys])


    const checkChallenge = () => {
        let expectedNotes = Chord.notes(currentChallenge)
        let actualNotes = context.keys.map(midiNoteToString)

        console.log("Expected notes", expectedNotes)
        console.log("Challenger notes", actualNotes)

        if (expectedNotes.every(v => actualNotes.includes(v))) {
            console.log("Challenge completed!")
            setCompletedCount(old => old + 1)
            setCurrentChallenge(getChallenge())
        }
    }

    const getChallenge = () => {
        let chords = Chord.names()
        let notes = Note.names(" ")
        const randomChord = chords[Math.floor(Math.random() * chords.length)];
        console.log(Note.names())
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        return randomNote + randomChord
    }

    return (
        <Grid container spacing={2}>
            
            <Grid item xs={6}>
                <Card>
                {
                    <h1>Current chord: {currentChallenge}</h1>
                }
                    <p>Chords completed: {completedCount}</p>
                </Card>


            </Grid>
            <Grid item xs={6}>
                {/* <Card>
                <h1>Challenges Debug</h1>
                {
                    <p>Expected: { Chord.notes(currentChallenge) }</p>
                }
                </Card> */}
            </Grid>
        </Grid>
    )
}

