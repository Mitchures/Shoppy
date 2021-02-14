import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';
import Card from '../components/Card';
import Link from 'next/link';
import Loader from '../components/Loader';

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
    <div className={styles.home}>
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
        {!productList && <Loader containerHeight="300px" />}
        <div className={styles.grid}>
          {productList &&
            show &&
            productList.slice(0, 10).map((product, index) => (
              <Link key={index} href={`/product?id=${product.id}`}>
                <a onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', selectedProduct: product })}>
                  <Card key={index} {...product} />
                </a>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
}
