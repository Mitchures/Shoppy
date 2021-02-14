import React, { useEffect } from 'react';
import styles from '../styles/Product.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';
import { useRouter } from 'next/router';

function product() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const product = useSelector((state: State) => state.selectedProduct);

  // If the user refreshes the page, then the store is reset.
  // So we want take the ID which remains in the url after refresh and fetch the selected product again.
  useEffect(() => {
    if (!product) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch({ type: 'SET_SELECTED_PRODUCT', selectedProduct: data });
        });
    }
  }, [product]);

  return (
    <div className={styles.product}>
      {product && (
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={product.image} alt={product.title} />
            </div>
          </div>
          <div className={styles.right}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h2>{product.price}</h2>
            <button>Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default product;
