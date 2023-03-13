
import { colors } from '@mui/material';
import './ChallengeCard.css'

export function ChallengeCard(props) {


    let getTextStyle = () => {
        let colorString = 'black';
        if (props.success !== undefined) {
            colorString = props.success ? 'green' : 'black'
        }

        return { color: colorString }
    }

    return (
        <div className={'challenge-card' + (props.success ? ' fly-away' : '')}>
            <span style={getTextStyle()} className="key">{props.note}</span>
            <span style={getTextStyle()} className="chord">{props.chord}</span>
        </div>
    )
}