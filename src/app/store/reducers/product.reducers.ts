import { initialProductState } from '../states/product.state';
import {
	DeleteProduct,
	DeleteProductFailure,
	DeleteProductSuccess,
	GetProduct,
	GetProductFailure,
	GetProductSuccess,
	UpdateProduct,
	UpdateProductFailure,
	UpdateProductSuccess,
} from '../actions/product.actions';
import { createReducer, on } from '@ngrx/store';

export const ProductReducer = createReducer(
	initialProductState,

	on(GetProduct, (state) => ({
		...state,
		loading: true,
	})),

	on(GetProductSuccess, (state, { product }) => ({
		...state,
		currentProduct: product,
		loading: false,
		error: false,
	})),

	on(GetProductFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	})),

	on(UpdateProduct, (state) => ({
		...state,
		loading: true,
	})),

	on(UpdateProductSuccess, (state) => ({
		...state,
		currentProduct: null,
		loading: false,
		error: false,
	})),

	on(UpdateProductFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	})),

	on(DeleteProduct, (state) => ({
		...state,
		loading: true,
	})),

	on(DeleteProductSuccess, (state) => ({
		...state,
		currentProduct: null,
		loading: false,
		error: false,
	})),

	on(DeleteProductFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
