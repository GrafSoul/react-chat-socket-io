import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
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

    return <h1>Chat</h1>;
};

export default Chat;
