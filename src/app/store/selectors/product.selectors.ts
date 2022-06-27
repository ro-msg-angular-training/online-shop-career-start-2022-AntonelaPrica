import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';
import { ProductState } from '../states/product.state';

export const selectProductState = (state: AppState) => state.productState;

export const selectCurrentProduct = createSelector(selectProductState, (state: ProductState) => state.currentProduct);

export const selectIsLoading = createSelector(selectProductState, (state: ProductState) => state.loading);

export const selectIsError = createSelector(selectProductState, (state: ProductState) => state.error);
