import React, { useEffect } from 'react';
import styles from '../styles/Product.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../utils/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { fadeInUp, stagger, fadeInFromLeft } from '../utils/animations';

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
        <motion.div exit={{ opacity: 0 }} initial="hidden" animate="show" className={styles.body}>
          <div className={styles.left}>
            <Link href="/">
              <a>
                <FontAwesomeIcon icon="chevron-left" />
              </a>
            </Link>
            <div className={styles.image}>
              <motion.img variants={fadeInFromLeft} src={selectedProduct.image} alt={selectedProduct.title} />
            </div>
          </div>
          <motion.div variants={stagger} className={styles.right}>
            <motion.h1 variants={fadeInUp}>{selectedProduct.title}</motion.h1>
            <motion.p variants={fadeInUp}>{selectedProduct.description}</motion.p>
            <motion.h2 variants={fadeInUp}>
              <span>{selectedProduct.displayPrice.charAt(0)}</span>
              {selectedProduct.displayPrice.substring(1)}
            </motion.h2>
            <motion.button variants={fadeInUp}>Buy Now</motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default product;
