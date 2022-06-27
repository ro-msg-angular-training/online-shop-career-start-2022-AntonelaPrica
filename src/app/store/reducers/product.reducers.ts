import { initialProductState } from '../states/product.state';
import {
	deleteProduct,
	deleteProductFailure,
	deleteProductSuccess,
	getProduct,
	getProductFailure,
	getProductSuccess,
	updateProduct,
	updateProductFailure,
	updateProductSuccess,
} from '../actions/product.actions';
import { createReducer, on } from '@ngrx/store';

export const ProductReducer = createReducer(
	initialProductState,

	on(getProduct, (state) => ({
		...state,
		loading: true,
	})),

	on(getProductSuccess, (state, { product }) => ({
		...state,
		currentProduct: product,
		loading: false,
		error: false,
	})),

	on(getProductFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	})),

	on(updateProduct, (state) => ({
		...state,
		loading: true,
	})),

	on(updateProductSuccess, (state) => ({
		...state,
		currentProduct: null,
		loading: false,
		error: false,
	})),

	on(updateProductFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	})),

	on(deleteProduct, (state) => ({
		...state,
		loading: true,
	})),

	on(deleteProductSuccess, (state) => ({
		...state,
		currentProduct: null,
		loading: false,
		error: false,
	})),

	on(deleteProductFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
