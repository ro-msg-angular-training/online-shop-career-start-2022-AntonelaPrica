import { initialProductListState } from '../states/product-list.state';
import { getProductList, getProductListFailure, getProductListSuccess } from '../actions/product-list.actions';
import { createReducer, on } from '@ngrx/store';

export const ProductListReducer = createReducer(
	initialProductListState,

	on(getProductList, (state) => ({
		...state,
		loading: true,
	})),

	on(getProductListSuccess, (state, { products }) => ({
		...state,
		products: products,
		loading: false,
		error: false,
	})),

	on(getProductListFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
