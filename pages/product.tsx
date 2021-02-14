import React, { useEffect } from 'react';
import styles from '../styles/Product.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../utils/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';

function product() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { selectedProduct, products } = useSelector((state: State) => state);
  // If the user refreshes the page, then the selectedProduct is reset in the store.
  // So we want take the ID which remains in the url after refresh and fetch the selected product again.
  useEffect(() => {
    if (!selectedProduct && products) {
      const product = products.filter((item) => `${item.id}` === id)[0];
      dispatch({ type: 'SET_SELECTED_PRODUCT', selectedProduct: product });
    }
  }, [selectedProduct, products]);

  return (
    <div className={styles.product}>
      {!selectedProduct && <Loader containerHeight="85vh" />}
      {selectedProduct && (
        <div className={styles.body}>
          <div className={styles.left}>
            <Link href="/">
              <a>
                <FontAwesomeIcon icon="chevron-left" />
              </a>
            </Link>
            <div className={styles.image}>
              <img src={selectedProduct.image} alt={selectedProduct.title} />
            </div>
          </div>
          <div className={styles.right}>
            <h1>{selectedProduct.title}</h1>
            <p>{selectedProduct.description}</p>
            <h2>
              <span>{selectedProduct.displayPrice.charAt(0)}</span>
              {selectedProduct.displayPrice.substring(1)}
            </h2>
            <button>Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default product;
