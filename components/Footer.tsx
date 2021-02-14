import React from 'react';
import styles from '../styles/Footer.module.scss';
import Image from 'next/image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHeart, faShoppingCart);

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.MadeWithLove}>
          Made with <FontAwesomeIcon icon="heart" /> by{' '}
          <a href="https://mitchures.co/" target="_blank">
            Mitchell Hollander
          </a>
        </span>
      </div>
      <div className={styles.right}>
        <Image src="/images/shoppy-logo-grey.svg" alt="Shoppy" width={40} height={40} />
        <h2>Shoppy</h2>
      </div>
    </footer>
  );
}

export default Footer;
