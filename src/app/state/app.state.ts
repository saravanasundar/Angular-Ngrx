import { UserState } from '../user/state/user.reducer';

// will add this interface to lazy loaded features, only non lazy loaded features will added here
export interface State {
  users: UserState;
}
