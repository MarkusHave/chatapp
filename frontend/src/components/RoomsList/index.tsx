import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';

import { Room } from '../../interfaces';
import RoomListItem from './RoomListItem';
import { UserContext } from '../../UserContext';

const RoomsList = ({ chatRooms }: { chatRooms: Array<Room> }) => {
  const [username, setUsername] = useState<string>('');
  const { setUser, user } = useContext(UserContext);

  const handleNameChange = async () => {
    setUser(username);
    localStorage.setItem('user', username);
    setUsername('');
  };

  return (
    <>
      <Box display='flex' justifyItems='center' alignItems='center'>
        <TextField
          size='medium'
          label='Username'
          value={username}
          variant='outlined'
          inputProps={{ maxLength: 100 }}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleNameChange()}>
          Set username
        </Button>
      </Box>

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
