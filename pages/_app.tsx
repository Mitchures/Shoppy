import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { WithSplashScreen } from '../components/WithSplashScreen';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import { fx } from 'money';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const { dispatch } = store;
  const [products, setProducts] = useState(null);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    // Fetch products
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Set list of products
        setProducts(data);
      });
    // Fetch Currency Rates
    fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY')
      .then((response) => response.json())
      .then((data) => {
        // Set Rates
        setRates(data.rates);
      });
  }, []);

  useEffect(() => {
    if (products && rates) {
      // Initially format product prices for USD since its the base currency.
      fx.base = 'USD';
      fx.rates = rates;
      const updatedProducts = [
        ...products.map((product) => {
          // Format to displayPrice to preserve original product price
          product.displayPrice = '$' + fx(product.price).from('USD').to('USD').toFixed(2);
          return product;
        }),
      ];
      dispatch({ type: 'SET_PRODUCTS', products: updatedProducts });
      dispatch({ type: 'SET_RATES', rates: rates });
    }
  }, [products, rates]);

  return (
    <Provider store={store}>
      <Head>
        <title>Shoppy</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default WithSplashScreen(MyApp);
