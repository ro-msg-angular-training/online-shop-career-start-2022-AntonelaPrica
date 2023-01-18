import { AuthState } from '../states/auth.state';
import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';

export const selectAuthState = (state: AppState) => state.authState;

export const selectAuthCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.currentUser);

export const selectIsCurrentUserAdmin = createSelector(
	selectAuthState,
	(state: AuthState) => state.currentUser?.roles?.includes('admin') || false
);

export const selectIsCurrentUserCustomer = createSelector(
	selectAuthState,
	(state: AuthState) => state.currentUser?.roles?.includes('customer') || false
);

export const selectAuthIsLoading = createSelector(selectAuthState, (state: AuthState) => state.loading);

export const selectAuthIsError = createSelector(selectAuthState, (state: AuthState) => state.error);
