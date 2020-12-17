import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import Head from 'next/head';
import useAxios from 'axios-hooks';
import { AxiosRequestConfig } from 'axios';

type Room = {
  id: number;
  name: string;
};

const Home = () => {
  // Axios config
  const axiosConf: AxiosRequestConfig = {
    url: '/rooms',
    method: 'get',
    baseURL: `${process.env.NEST_HOST}:${process.env.NEST_PORT}`,
  };

  const [chatRooms, setChatRooms] = useState<Array<Room>>([]);
  const [{ data, loading, error }, refetch] = useAxios<Array<Room>>(axiosConf);

  useEffect(() => {
    setChatRooms(data);
  }, [data]);

  if (!chatRooms) {
    return (
      <Container maxWidth='sm'>
        <Head>
          <title>Chat App</title>
        </Head>
        <Box>
          <Typography variant='h4'>Chat App</Typography>
          <Box>
            <Typography variant='h5'>Available chat rooms:</Typography>
            <Box>Loading...</Box>
          </Box>
        </Box>
      </Container>
    );
  } else {
    const rooms = chatRooms.map((room: Room) => {
      return (
        <Typography variant='h6' key={room.id}>
          {room.name}
        </Typography>
      );
    });

    return (
      <Container maxWidth='sm'>
        <Head>
          <title>Chat App</title>
        </Head>
        <Box>
          <Typography variant='h4'>Chat App</Typography>
          <Box>
            <Typography variant='h6'>Available chat rooms:</Typography>
            <Box>{rooms}</Box>
          </Box>
        </Box>
      </Container>
    );
  }
};

export default Home;
