import React, { useEffect, useState } from 'react';
import styles from '../styles/Card.module.scss';
import { fx } from 'money';
import { State } from '../types';
import { useSelector } from 'react-redux';

function Card({ title, image, price }) {
  const { rates, selectedCurrency, baseCurrency, currencySymbols } = useSelector((state: State) => state);
  const [currentPrice, setCurrentPrice] = useState(price);

  useEffect(() => {
    fx.base = baseCurrency;
    fx.rates = rates;
    setCurrentPrice(currencySymbols[selectedCurrency] + fx(price).from(baseCurrency).to(selectedCurrency).toFixed(2));
  }, []);

  useEffect(() => {
    if (selectedCurrency !== baseCurrency) {
      setCurrentPrice(currencySymbols[selectedCurrency] + fx(price).from(baseCurrency).to(selectedCurrency).toFixed(2));
    } else if (selectedCurrency === baseCurrency) {
      setCurrentPrice(currencySymbols[selectedCurrency] + price.toFixed(2));
    }
  }, [selectedCurrency]);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <h4>{title}</h4>
      <p>{currentPrice}</p>
    </div>
  );
}

export default Card;
