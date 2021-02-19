import Head from 'next/head';
import { Container, Box, Typography } from '@material-ui/core';

const Layout = (props: any) => (
  <Container maxWidth='sm'>
    <Head>
      <title>Chat App</title>
    </Head>
    <Box>
      <Typography variant='h4'>Chat App</Typography>
      <Box>{props.children}</Box>
    </Box>
  </Container>
);

export default Layout;
