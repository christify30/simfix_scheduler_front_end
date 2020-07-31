import React from 'react';
import {FcDocument} from 'react-icons/all'

const DefaultButtonLarge = props => {
    return (
        <button disabled = {props.disable} className = 'round_button' onClick = { props.onClick }>
            <FcDocument size={50}/>
            { props.title }
        </button>
    )
}

export default DefaultButtonLarge;

