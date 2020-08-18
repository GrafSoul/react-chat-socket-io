import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Join.module.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className={classes.joinOuterContainer}>
            <div className={classes.joinInnerContainer}>
                <h1 className={classes.heading}>Simple Chat</h1>
                <div>
                    <input
                        placeholder="Name"
                        className={classes.joinInput}
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className={classes.joinInput + ' ' + classes.mt20}
                        type="text"
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link
                    onClick={(e) =>
                        !name || !room ? e.preventDefault() : null
                    }
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button
                        className={classes.button + ' ' + classes.mt20}
                        type="submit"
                    >
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
