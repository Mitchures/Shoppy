import React, { Component, FC } from 'react';
import styles from '../styles/WithSplashScreen.module.scss';
import Image from 'next/image';

function ShowSplashScreen() {
  return (
    <div id="splashScreen" className={styles.splashScreen}>
      <div className={styles.content}>
        <h1>Hello </h1>
        <Image src="/images/shoppy-logo.svg" alt="Shoppy" width={64} height={64} />
        <h1>Shoppy</h1>
      </div>
    </div>
  );
}

export function WithSplashScreen(WrappedComponent: FC) {
  return class extends Component<{}, { loading: boolean }> {
    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      const splashScreenElm: HTMLElement | null = document.getElementById('splashScreen');
      setTimeout(() => {
        if (splashScreenElm) {
          splashScreenElm.classList.add('loaded');
        }
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1000);
      }, 1500);
    }

    render() {
      if (this.state.loading) return ShowSplashScreen();
      return <WrappedComponent {...this.props} />;
    }
  };
}
