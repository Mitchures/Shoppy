export interface IProduct {
  id: Number;
  title: string;
  price: Number;
  description: string;
  category: string;
  image: string;
};

export interface IRates {
  EUR: Number;
  JPY: Number;
  GBP: Number;
  USD: Number;
};

export interface ICurrency {
  EUR: string;
  JPY: string;
  GBP: string;
  USD: string;
};

export type State = {
  rates: IRates | null;
  selectedCurrency: string;
  baseCurrency: string;
  currencySymbols: ICurrency;
  products: IProduct[] | null;
  selectedProduct: IProduct | null;
};

export type Action =
  | {
      type: 'SET_RATES';
      rates: IRates;
    }
  | {
      type: 'SET_SELECTED_CURRENCY';
      selectedCurrency: string;
    }
  | {
      type: 'SET_SELECTED_PRODUCT';
      selectedProduct: IProduct;
    }
  | {
      type: 'SET_PRODUCTS';
      products: IProduct[];
    };