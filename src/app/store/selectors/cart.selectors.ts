import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';
import { CartState } from '../states/cart.state';

export const selectCartState = (state: AppState) => state.cartState;

export const selectCartProducts = createSelector(selectCartState, (state: CartState) => state.cartProducts);

export const selectIsLoading = createSelector(selectCartState, (state: CartState) => state.loading);

export const selectIsError = createSelector(selectCartState, (state: CartState) => state.error);
