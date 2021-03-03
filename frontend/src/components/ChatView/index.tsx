import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import styles from '../../../styles/Chat.module.css';

import { Message, Room } from '../../interfaces';
import MessagesList from './MessagesList';
interface ChatViewProps {
  room: Room;
  messages: Array<Message>;
  sendMessage: (messageBody: string) => Promise<void>;
}

const ChatView = ({ room, messages, sendMessage }: ChatViewProps) => {
  const [messageBody, setMessageBody] = useState<string>();

  return (
    <Box>
      <Typography variant='h5'>{room.name}</Typography>

      <Box className={styles.chat}>
        <Box className={styles.messagesList}>
          <MessagesList messages={messages} />
        </Box>

        <Box className={styles.messageInputBox}>
          <TextField
            size='medium'
            label='Message'
            className={styles.messageInput}
            inputProps={{ maxLength: 100 }}
            onChange={({ target: { value } }) => setMessageBody(value)}
          />

          <Button
            variant='contained'
            color='primary'
            onClick={() => sendMessage(messageBody)}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatView;
