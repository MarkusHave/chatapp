import React from 'react';
import { Typography } from '@material-ui/core';
import { Message } from '../../interfaces';

export interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <>
      <Typography>{message.body}</Typography>
    </>
  );
};

export default MessageItem;
