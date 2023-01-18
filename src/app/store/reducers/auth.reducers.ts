import { LoginUser, LoginUserFailure, LoginUserSuccess } from '../actions/auth.actions';
import { initialAuthState } from '../states/auth.state';
import { createReducer, on } from '@ngrx/store';

export const AuthReducer = createReducer(
	initialAuthState,

	on(LoginUser, (state) => ({
		...state,
		loading: true,
	})),

	on(LoginUserSuccess, (state, { userDetails }) => ({
		...state,
		currentUser: userDetails,
		loading: false,
		error: false,
	})),

	on(LoginUserFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
