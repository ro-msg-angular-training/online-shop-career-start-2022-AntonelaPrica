import { initialProductListState } from '../states/product-list.state';
import { GetProductList, GetProductListFailure, GetProductListSuccess } from '../actions/product-list.actions';
import { createReducer, on } from '@ngrx/store';

export const ProductListReducer = createReducer(
	initialProductListState,

	on(GetProductList, (state) => ({
		...state,
		loading: true,
	})),

	on(GetProductListSuccess, (state, { products }) => ({
		...state,
		products: products,
		loading: false,
		error: false,
	})),

	on(GetProductListFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
