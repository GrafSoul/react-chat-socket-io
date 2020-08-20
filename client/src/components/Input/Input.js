import React from 'react';

import classes from './Input.module.css';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form className={classes.form}>
            <input
                type="text"
                className={classes.input}
                placeholder="Type a massage..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
            />
            <button
                className={classes.sendButton}
                onClick={(e) => sendMessage(e)}
            >
                Send
            </button>
        </form>
    );
};

export default Input;
