import {
  createReducer,
  on,
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';

export interface state extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  // currentProduct: Product;
  products: Product[];
  currentProductId: number;
}

const initialState: ProductState = {
  showProductCode: true,
  // currentProduct: null,
  currentProductId: null,
  products: [],
};

export const productReducer = createReducer<ProductState>(
  // feature name and event
  initialState,
  on(createAction('[Product] Toggle product Code'), (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);

// selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state: ProductState, currentProductId) =>
    state.products.find((p) => (p.id = currentProductId))
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.products
);
