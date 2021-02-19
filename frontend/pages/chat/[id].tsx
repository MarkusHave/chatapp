import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core/';

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

// Init global socket
const socket = io(`${SERVER}/chat`);

const Chat = ({ room }) => {
  const [messages, setMessages] = useState<Array<Message> | undefined>();

  useEffect(() => {
    // Test if socket is connected and connect
    if (!socket.connected) {
      socket.connect();
      console.log('Socket join');
    }

    // Join chat room
    socket.emit('joinRoom', { room: `${room.id}_${room.name}` }, () => {
      console.log(`Joined room: ${room.id}_${room.name}`);
    });

    return () => {
      console.log('Socket disconnected');
      socket.disconnect();
    };
  }, []);

  socket.on('joinedRoom', () => {
    console.log('Joined room');
  });

  if (!room) {
    return <Typography variant='h5'>Loading...</Typography>;
  }

  return <ChatView room={room} messages={messages} />;
};

export default Chat;
