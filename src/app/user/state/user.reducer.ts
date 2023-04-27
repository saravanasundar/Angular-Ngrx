import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserName: boolean;
}

export const userReducer = createReducer<UserState>(
  { maskUserName: true },
  on(UserActions.maskUserName, (state): UserState => {
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
