import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Chat App</title>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
