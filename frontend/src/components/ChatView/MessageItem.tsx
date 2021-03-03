import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Message } from '../../interfaces';
import styles from '../../../styles/Chat.module.css';

export interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <Box className={styles.messageBox}>
      <Typography style={{ fontWeight: 'bold' }}>
        {message.createdAt} by {message.name}:
      </Typography>
      <Box>
        <Typography>{message.body}</Typography>
      </Box>
    </Box>
  );
};

export default MessageItem;
