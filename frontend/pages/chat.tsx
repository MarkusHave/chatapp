import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core/';

import Room from '../src/interfaces/room';
import Layout from '../src/components/Layout';

export const getStaticProps: GetStaticProps = async () => {
  console.log(room);
  // Get room id from URL
  const roomId = room;

  // TODO: get room data to chat page

  // Get room by id
  const chatRoom: Room = await axios
    .get(`${process.env.NEST_HOST}/rooms/${roomId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return {
    props: {
      room: chatRoom,
    },
  };
};

const Chat = ({ room }) => {
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
