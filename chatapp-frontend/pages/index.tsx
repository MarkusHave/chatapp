import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import Head from 'next/head';

export default function Home() {
  return (
    <Container maxWidth='sm'>
      <Head>
        <title>Chat App</title>
      </Head>
      <Box>
        <Typography variant='h4'>Chat App</Typography>
        <Box>
          <Typography variant='h6'>Available chat rooms:</Typography>
          <Box></Box>
        </Box>
      </Box>
    </Container>
  );
}
