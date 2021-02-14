import React, { useState, useEffect } from 'react';
import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../types';
import { fx } from 'money';

function Header() {
  const dispatch = useDispatch();
  const [currencies] = useState(['USD', 'GBP', 'EUR', 'JPY']);
  const [currencyChanged, setCurrencyChanged] = useState(false);
  const { selectedCurrency, baseCurrency, currencySymbols, products, selectedProduct, rates } = useSelector(
    (state: State) => state,
  );

  useEffect(() => {
    if (currencyChanged) {
      fx.base = baseCurrency;
      fx.rates = rates;
      const updatedProducts = [
        ...products.map((product) => {
          product.displayPrice =
            currencySymbols[selectedCurrency] + fx(product.price).from(baseCurrency).to(selectedCurrency).toFixed(2);
          return product;
        }),
      ];
      dispatch({ type: 'SET_PRODUCTS', products: updatedProducts });
      if (selectedProduct) {
        selectedProduct.displayPrice =
          currencySymbols[selectedCurrency] +
          fx(selectedProduct.price).from(baseCurrency).to(selectedCurrency).toFixed(2);
        dispatch({ type: 'SET_SELECTED_PRODUCT', selectedProduct: selectedProduct });
      }
      setCurrencyChanged(false);
    }
  }, [currencyChanged]);

  const switchCurrency = (currency) => {
    setCurrencyChanged(true);
    dispatch({ type: 'SET_SELECTED_CURRENCY', selectedCurrency: currency });
  };

  return (
    <div className={styles.header}>
      <div className={styles.body}>
        <div className={styles.left}>
          <Link href="/">
            <a>
              <img src="/images/shoppy-logo.svg" alt="Shoppy" />
              <h1>Shoppy</h1>
            </a>
          </Link>
        </div>
        <div className={styles.right}>
          {currencies.map((currency, index) => (
            <a
              key={index}
              className={selectedCurrency == currency ? styles.active : ''}
              onClick={() => switchCurrency(currency)}
            >
              {currency}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
