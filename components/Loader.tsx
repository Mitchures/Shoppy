import React from 'react';
import styles from '../styles/Loader.module.scss';

function Loader({ containerHeight }) {
  return (
    <div className={styles.container} style={{ height: containerHeight }}>
      <div className={styles.loader}>
        <img src="/images/shoppy-logo-grey.svg" alt="Shoppy" />
      </div>
    </div>
  );
}

export default Loader;
