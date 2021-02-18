import React, { useEffect } from 'react';
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
import Layout from '../../src/components/Layout';
import { join } from 'path';

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
    return (
      <Layout>
        <Typography variant='h5'>Loading...</Typography>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box>
        <Typography>{room.name}</Typography>
        <Box>Chat Here</Box>
        <TextField label='Message' />
        <Button variant='contained' color='primary'>
          Send
        </Button>
      </Box>
    </Layout>
  );
};

export default Chat;
