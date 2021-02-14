import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';
import Card from '../components/Card';
import Link from 'next/link';

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: State) => state);
  const [links] = useState(['new', 'clothing', 'jewelery', 'electronics']);
  const [active, setActive] = useState('new');
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    // Fetch products
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Set list of products
        setProductList(data);
        dispatch({ type: 'SET_PRODUCTS', products: data });
      });
    // Fetch Currency Rates
    fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: 'SET_RATES', rates: data.rates });
      });
  }, []);

  useEffect(() => {
    setProductList(null);
    if (active !== 'new') {
      setProductList([...products.filter((product) => product.category.includes(active))]);
    } else {
      setProductList(products);
    }
  }, [active]);

  return (
    <div>
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
            <a key={index} className={active == link ? styles.active : ''} onClick={() => setActive(link)}>
              {link}
            </a>
          ))}
        </div>
        <div className={styles.grid}>
          {productList &&
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
