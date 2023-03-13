import { Card, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import * as Chord from "tonal-chord"
import * as Note from "tonal-note"
import { ChallengeCard } from "./ChallengeCard/ChallengeCard";
import { MidiContext } from "../Context/MidiProvider";
import midiNoteToString from "../util/midiNoteToString";
import './ChallengeCard/ChallengeCard.css'

export default function Challenger({ props }) {

    const context = useContext(MidiContext)

    const isDebugMode = true
    const isCreateEasyChallenges = true;

    const [completedCount, setCompletedCount] = useState(0)
    const [currentChallenge, setCurrentChallenge] = useState({
        note: undefined,
        chord: undefined,
    });

    const [nextChallenge, setNextChallenge] = useState({
        note: undefined,
        chord: undefined,
    });

    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (currentChallenge.note == undefined) {
            console.log("Generating challenge");
            setCurrentChallenge(generateChallenge())
            setNextChallenge(generateChallenge())
        }

        checkChallenge()
    }, [context.keys])


    const checkChallenge = () => {

        let expectedNotes = Chord.notes(currentChallenge.note + '' + currentChallenge.chord)
        let actualNotes = context.keys.map(midiNoteToString)

        console.log("Checking challenge", expectedNotes, actualNotes);
        
        if (expectedNotes.length > 0) {

            if (expectedNotes.every(v => actualNotes.includes(v))) {
                setCompletedCount(old => old + 1)
                setCompleted(true)
                setTimeout(() => {
                    console.log("ok")
                    setCompleted(false)
                    setCurrentChallenge(nextChallenge)
                    setNextChallenge(generateChallenge())
                }, 1000)
                setCompletedCount(old => old + 1)
            }
        }
    }

    const generateChallenge = () => {
        let chords = Chord.names()
        let notes = Note.names(" ")
        const randomChord = chords[Math.floor(Math.random() * chords.length)]
        console.log(Note.names())
        const randomNote = notes[Math.floor(Math.random() * notes.length)]
        let newChallenge =  { note: randomNote, chord: isCreateEasyChallenges ? '' : randomChord }
        console.log("New challenge:", newChallenge)
        return newChallenge
    }

    let debug = <Grid item xs={6}>
        {<Card>
            <h1>Challenges Debug</h1>
            {
                <p>Expected: {Chord.notes(currentChallenge.note + '' + currentChallenge.chord)}</p>
            }
        </Card>}
    </Grid>

    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <Card>
                    <h1>Chord Challenger</h1>
                    <div className="challenge-card-container">
                        <ChallengeCard success={completed} note={currentChallenge.note} chord={currentChallenge.chord} />
                        <ChallengeCard note={nextChallenge.note} chord={nextChallenge.chord} />
                        <ChallengeCard visible={completed == undefined || !completed} chord={currentChallenge.chord} />
                    </div>
                    <p>Chords completed: {completedCount}</p>
                </Card>
                

            </Grid>
            {isDebugMode ? debug : null}
        </Grid>
    )
}

