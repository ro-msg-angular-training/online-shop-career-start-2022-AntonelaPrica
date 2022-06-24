import { loginUser, loginUserFailure, loginUserSuccess } from '../actions/auth.actions';
import { initialAuthState } from '../states/auth.state';
import { createReducer, on } from '@ngrx/store';

export const AuthReducer = createReducer(
	initialAuthState,

	on(loginUser, (state) => ({
		...state,
		loading: true,
	})),

	on(loginUserSuccess, (state, { userDetails }) => ({
		...state,
		currentUser: userDetails,
		loading: false,
		error: false,
	})),

	on(loginUserFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
