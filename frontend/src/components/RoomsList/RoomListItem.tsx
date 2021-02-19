import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@material-ui/core';

import { Room } from '../../interfaces';

const RoomListItem = ({ room }: { room: Room }) => (
  <Box key={room.id} style={{ backgroundColor: 'lightblue' }}>
    <Link href={`/chat/${room.id}`}>
      <Typography variant='h6'>{room.name}</Typography>
    </Link>
  </Box>
);

export default RoomListItem;
