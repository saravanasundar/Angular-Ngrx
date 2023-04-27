import {
  createReducer,
  on,
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface UserState {
  maskUserName: boolean;
}

export const userReducer = createReducer<UserState>(
  { maskUserName: true },
  on(createAction('[User] Mask User Name'), (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);

// selectors
const getUsersState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUsersState,
  (state: UserState) => state.maskUserName
);
