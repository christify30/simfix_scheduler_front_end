import React from 'react';
import './Buttons.css';

const DefaultButtonLarge = props => {
    return (
        <button disabled = {props.disable} className = 'large_button' onClick = { props.onClick }>
            { props.title }
        </button>
    )
}

export default DefaultButtonLarge;

