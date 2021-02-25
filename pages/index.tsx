import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';
import Card from '../components/Card';
import Link from 'next/link';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '../utils/animations';

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: State) => state);
  const [links] = useState(['new', 'clothing', 'jewelery', 'electronics']);
  const [active, setActive] = useState('new');
  const [show, setShow] = useState(false);
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    if (products) {
      switchCategory(active);
    }
  }, [products]);

  const switchCategory = (category) => {
    setShow(false);
    if (category !== 'new') {
      setProductList([...products.filter((product) => product.category.includes(category))]);
    } else {
      setProductList(products);
    }
    setActive(category);
    setTimeout(() => {
      setShow(true);
    }, 200);
  };

  return (
    <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.home}>
      <div className={styles.banner}>
        <div className={styles.overlay}>
          <h1>
            Welcome to <span>Shoppy</span>, <br /> the latest trending shopping experience!
          </h1>
          <h2>Shop all the latest items at a ridiculously low price.</h2>
        </div>
      </div>

      <main className={styles.main}>
        <h1>What's New</h1>
        <div className={styles.filters}>
          {links.map((link, index) => (
            <a key={index} className={active == link ? styles.active : ''} onClick={() => switchCategory(link)}>
              {link}
            </a>
          ))}
        </div>
        <div className={styles.container}>
          {!productList && <Loader containerHeight="400px" />}
          {productList && show && (
            <motion.div variants={stagger} initial="hidden" animate="show" className={styles.grid}>
              {productList.slice(0, 10).map((product, index) => (
                <Link key={index} href={`/product?id=${product.id}`}>
                  <motion.a
                    variants={fadeInUp}
                    onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', selectedProduct: product })}
                  >
                    <Card key={index} {...product} />
                  </motion.a>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
