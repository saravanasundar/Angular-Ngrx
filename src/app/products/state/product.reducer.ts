import { createReducer, on, createAction } from '@ngrx/store';

const productList = {
  showProductCode: true,
};

export const productReducer = createReducer(
  // feature name and event
  productList,
  on(createAction('[Product] Toggle product Code'), (state, action) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
