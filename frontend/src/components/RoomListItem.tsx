import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';

const RoomListItem = ({ room }) => (
  <Box key={room.id} style={{ backgroundColor: 'lightblue' }}>
    <Link href={`/chat/${room.id}`}>
      <Typography variant='h6'>{room.name}</Typography>
    </Link>
  </Box>
);

export default RoomListItem;
