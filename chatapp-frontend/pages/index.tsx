import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import axios from 'axios';

import Room from '../src/interfaces/room';
import Layout from '../src/components/Layout';
import RoomListItem from '../src/components/RoomListItem';

export const getStaticProps: GetStaticProps = async () => {
  // Get all chat rooms from backend
  const chatRooms: Array<Room> = await axios
    .get(`${process.env.NEST_HOST}/rooms`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return {
    props: {
      chatRooms,
    },
  };
};

const Home = ({ chatRooms }) => {
  if (!chatRooms) {
    return (
      <Layout>
        <Box>
          <Typography variant='h5'>Available chat rooms:</Typography>
          <Box>Loading...</Box>
        </Box>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Box>
          <Typography variant='h6'>Available chat rooms:</Typography>
          <Box>
            {chatRooms.map((room: Room) => {
              return <RoomListItem key={room.id} room={room} />;
            })}
          </Box>
        </Box>
      </Layout>
    );
  }
};

export default Home;
