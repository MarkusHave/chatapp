import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import styles from '../../../styles/Chat.module.css';
import { Message, Room } from '../../interfaces';
import MessagesList from './MessagesList';

interface ChatViewProps {
  room: Room;
  messages: Array<Message>;
  sendMessage: (messageBody: string) => Promise<void>;
}

const ChatView = ({ room, messages, sendMessage }: ChatViewProps) => {
  const [messageBody, setMessageBody] = useState<string>('');

  const handleSend = async (msg: string) => {
    sendMessage(msg);
    setMessageBody('');
  };

  return (
    <Box>
      <Box display='flex' justifyItems='center' alignItems='center'>
        <Link href={'/'}>
          <IconButton aria-label='go-back' color='primary'>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant='h5'>{room.name}</Typography>
      </Box>

      <Box className={styles.chat}>
        <Box className={styles.messagesList}>
          <MessagesList messages={messages} />
        </Box>

        <Box className={styles.messageInputBox}>
          <TextField
            size='medium'
            label='Message'
            value={messageBody}
            className={styles.messageInput}
            inputProps={{ maxLength: 100 }}
            onChange={({ target: { value } }) => setMessageBody(value)}
          />

          <Button
            variant='contained'
            color='primary'
            onClick={() => handleSend(messageBody)}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ChatView;
