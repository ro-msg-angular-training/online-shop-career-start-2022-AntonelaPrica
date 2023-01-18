import { UserDetails } from '../../model/UserDetails';

export interface AuthState {
	currentUser: UserDetails | null;
	loading: boolean;
	error: boolean;
}

export const initialAuthState: AuthState = {
	currentUser: null,
	loading: false,
	error: false,
};
