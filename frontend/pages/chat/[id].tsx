import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import io from 'socket.io-client';
import axios from 'axios';
import dayjs from 'dayjs';
import { Button, Typography } from '@material-ui/core/';

import Room from '../../src/interfaces/room';
import Message from '../../src/interfaces/message';
import { ChatView } from '../../src/components';

const SERVER = process.env.NEST_HOST;

export const getStaticPaths: GetStaticPaths = async () => {
  const rooms: Array<Room> = await axios
    .get(`${SERVER}/rooms`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  // Map all room id's
  const ids = rooms.map((room) => room.id);

  // Map all paths from room id's
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Get room by id
  const room: Room = await axios
    .get(`${SERVER}/rooms/${context.params.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return {
    props: {
      room,
    },
  };
};

interface ChatProps {
  room: Room;
}

// Init global socket
const socket = io(`${SERVER}/chat`);

const Chat = ({ room }: ChatProps) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [currentUser, setCurrentUser] = useState<string>();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setCurrentUser(user);

    // Test if socket is connected and connect
    if (!socket.connected) {
      socket.connect();
      console.log('Socket join');
    }

    // Join chat room
    socket.emit('joinRoom', { room: `${room.id}_${room.name}` }, () => {
      console.log(`Joined room: ${room.id}_${room.name}`);
    });

    socket.on('joinedRoom', () => {
      const welcomeMsg: Message = {
        id: Math.random().toString(),
        name: 'ChatBot',
        body: `Welcome ${user}`,
        room: `${room.id}_${room.name}`,
        createdAt: dayjs().format('HH:mm'),
      };

      setMessages([...messages, welcomeMsg]);
    });

    return () => {
      console.log('Socket disconnected');
      socket.disconnect();
    };
  }, []);

  socket.once('msgToClient', (msg: Message) => {
    console.log(msg);
    setMessages([...messages, msg]);
  });

  const sendMessage = async (messageBody: string) => {
    const message: Message = {
      id: undefined,
      name: currentUser,
      body: messageBody,
      room: `${room.id}_${room.name}`,
      createdAt: dayjs().format('HH:mm'),
    };

    socket.emit('msgToServer', message);
  };

  if (!currentUser) {
    return (
      <>
        <Typography variant='h5'>Set username first</Typography>
        <Link href={'/'}>
          <Button variant='contained' color='primary'>
            Go back
          </Button>
        </Link>
      </>
    );
  }

  if (!room) {
    return <Typography variant='h5'>Loading...</Typography>;
  }

  return <ChatView room={room} messages={messages} sendMessage={sendMessage} />;
};

export default Chat;
