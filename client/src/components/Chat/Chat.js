import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import classes from './Chat.module.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT = 'localhost:5000';

    const socket = useRef(null);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket.current = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.current.emit('join', { name, room }, () => {});

        return () => {
            socket.current.emit('disconnect');
            socket.current.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.current.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.current.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, [messages, users]);

    // Function for sending messages
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.current.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    };

    return (
        <div className={classes.outerContainer}>
            <div className={classes.container}>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={users} />
        </div>
    );
};

export default Chat;
