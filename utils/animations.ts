export const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeInFromLeft = {
  hidden: { x: 200, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};