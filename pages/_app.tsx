import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { WithSplashScreen } from '../components/WithSplashScreen';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>Shoppy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default WithSplashScreen(MyApp);
