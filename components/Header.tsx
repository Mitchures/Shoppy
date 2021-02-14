import React, { useState } from 'react';
import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../types';

function Header() {
  const [links] = useState(['USD', 'GBP', 'EUR', 'JPY']);
  const { selectedCurrency } = useSelector((state: State) => state);
  const dispatch = useDispatch();

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
          {links.map((currency, index) => (
            <a
              key={index}
              className={selectedCurrency == currency ? styles.active : ''}
              onClick={() => dispatch({ type: 'SET_SELECTED_CURRENCY', selectedCurrency: currency })}
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
