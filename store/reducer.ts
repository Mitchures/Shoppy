import { initialState } from './initialState'
import { State, Action } from '../types';

export const reducer = (state: State = initialState, action: Action) => {
  console.log(state, action);
  switch (action.type) {
    case 'SET_RATES':
      return {
        ...state,
        rates: action.rates,
      }
    case 'SET_SELECTED_CURRENCY':
      return {
        ...state,
        selectedCurrency: action.selectedCurrency,
      }
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      }
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      }
    default:
      return state
  }
}