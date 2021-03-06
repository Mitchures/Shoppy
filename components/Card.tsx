import React from 'react';
import styles from '../styles/Card.module.scss';

function Card({ title, image, displayPrice }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <h4>{title}</h4>
      <p>
        <span>{displayPrice.charAt(0)}</span>
        {displayPrice.substring(1)}
      </p>
    </div>
  );
}

export default Card;
