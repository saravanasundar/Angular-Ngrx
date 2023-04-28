import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface state extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  // currentProduct: Product;
  products: Product[];
  currentProductId: number | null;
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  // currentProduct: null,
  currentProductId: null,
  products: [],
  error: '',
};

export const productReducer = createReducer<ProductState>(
  // feature name and event
  initialState,
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action) => {
    const updatedProducts = state.products.map((product) =>
      action.product.id === product.id ? action.product : product
    );

    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.deleteProductSuccess, (state, action) => {
    return {
      ...state,
      products: state.products.filter((product) => product.id !== action.id),
      currentProductId: 0,
      error: '',
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.addProductSuccess, (state, action) => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.addProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
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

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   (state: ProductState) => state.currentProduct
// );

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state: ProductState, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'new',
        description: '',
        starRating: 0,
      };
    }
    return currentProductId
      ? state.products.find((p) => p.id === currentProductId)
      : null;
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.products
);

export const getProductLoadFailures = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.error
);
