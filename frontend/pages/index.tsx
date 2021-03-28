import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { Room } from '../src/interfaces';
import { RoomsList } from '../src/components';
import { UserContext } from '../src/userContext';

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
  const [user, setUser] = useState<string>('');
  const usercontextValue = { user, setUser };

  if (!chatRooms) {
    return <Typography>Loading...</Typography>;
  } else {
    return (
      <UserContext.Provider value={usercontextValue}>
        <RoomsList chatRooms={chatRooms} />
      </UserContext.Provider>
    );
  }
};

export default Home;
