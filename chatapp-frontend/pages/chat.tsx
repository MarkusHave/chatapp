import React from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core/';

const Chat = () => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>

      <Box>
        <Typography variant='h4'>Room 1</Typography>
        <Box>
          <Box>Chat Here</Box>
          <TextField label='Message' />
          <Button variant='contained' color='primary'>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
