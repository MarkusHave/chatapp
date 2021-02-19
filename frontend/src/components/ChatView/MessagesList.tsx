import React from 'react';
import { Message } from '../../interfaces';
import MessageItem from './MessageItem';

export interface MessagesListProps {
  messages: Array<Message>;
}

const MessagesList = ({ messages }: MessagesListProps) => {
  return (
    <>
      {messages.map((message) => {
        <MessageItem message={message} />;
      })}
    </>
  );
};

export default MessagesList;
