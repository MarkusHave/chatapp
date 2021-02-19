import React from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';

import { Message, Room } from '../../interfaces';

interface ChatViewProps {
  room: Room;
  messages: Array<Message>;
}

const ChatView = ({ room, messages }: ChatViewProps) => {
  return (
    <Box>
      <Typography>{room.name}</Typography>
      <Box>Chat Here</Box>
      <TextField label='Message' />
      <Button variant='contained' color='primary'>
        Send
      </Button>

      <Box> </Box>
    </Box>
  );
};

export default ChatView;
