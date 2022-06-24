import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';
import { ProductListState } from '../states/product-list.state';

export const selectProductListState = (state: AppState) => state.productListState;

export const selectProducts = createSelector(selectProductListState, (state: ProductListState) => state.products);

export const selectIsLoading = createSelector(selectProductListState, (state: ProductListState) => state.loading);

export const selectIsError = createSelector(selectProductListState, (state: ProductListState) => state.error);
