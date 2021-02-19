import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { Room } from '../src/interfaces';
import { RoomsList } from '../src/components';

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

const Home = ({ chatRooms }: { chatRooms: Array<Room> }) => {
  if (!chatRooms) {
    return <Typography>Loading...</Typography>;
  } else {
    return <RoomsList chatRooms={chatRooms} />;
  }
};

export default Home;
