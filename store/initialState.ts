import { State } from '../types';

export const initialState: State = {
  rates: null,
  selectedCurrency: "USD",
  baseCurrency: "USD",
  currencySymbols: {
    USD: "$",
    JPY: "¥",
    EUR: "€",
    GBP: "£"
  },
  products: null,
  selectedProduct: null
}