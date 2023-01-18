import { initialCartState } from '../states/cart.state';
import {
	AddCartProduct,
	CheckoutCart,
	CheckoutCartFailure,
	CheckoutCartSuccess,
	DecreaseProductQuantity,
	IncreaseProductQuantity,
	RemoveCartProduct,
	UpdateCartProduct,
} from '../actions/cart.actions';
import { createReducer, on } from '@ngrx/store';

export const CartReducer = createReducer(
	initialCartState,

	on(AddCartProduct, (state, { cartProduct }) => {
		state.cartProducts.push(cartProduct);
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(UpdateCartProduct, (state, { orderItem }) => {
		const cartProductIdx = state.cartProducts.findIndex((product) => product.id === orderItem.productId);
		if (cartProductIdx !== -1) {
			state.cartProducts[cartProductIdx].quantity = orderItem.quantity;
		}
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(RemoveCartProduct, (state, { cartProductId }) => ({
		...state,
		cartProducts: state.cartProducts.filter((product) => product.id !== cartProductId),
		loading: false,
		error: false,
	})),

	on(IncreaseProductQuantity, (state, { cartProduct }) => {
		const productIndex = state.cartProducts.findIndex((cartProd) => cartProd.id == cartProduct.id);
		state.cartProducts[productIndex].quantity++;
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(DecreaseProductQuantity, (state, { cartProduct }) => {
		const productIndex = state.cartProducts.findIndex((cartProd) => cartProd.id == cartProduct.id);
		state.cartProducts[productIndex].quantity--;
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(CheckoutCart, (state) => ({
		...state,
		loading: true,
	})),

	on(CheckoutCartSuccess, (state) => ({
		...state,
		cartProducts: [],
		loading: false,
		error: false,
	})),

	on(CheckoutCartFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
