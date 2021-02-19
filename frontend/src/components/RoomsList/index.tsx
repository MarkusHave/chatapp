import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { Room } from '../../interfaces';
import RoomListItem from './RoomListItem';

const RoomsList = ({ chatRooms }: { chatRooms: Array<Room> }) => {
  return (
    <>
      <Typography variant='h6'>Available chat rooms:</Typography>
      <Box>
        {chatRooms.map((room: Room) => {
          return <RoomListItem key={room.id} room={room} />;
        })}
      </Box>
    </>
  );
};

export default RoomsList;
