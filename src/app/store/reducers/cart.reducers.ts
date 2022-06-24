import { initialCartState } from '../states/cart.state';
import {
	addCartProduct,
	checkoutCart,
	checkoutCartFailure,
	checkoutCartSuccess,
	decreaseProductQuantity,
	increaseProductQuantity,
	removeCartProduct,
	updateCartProduct,
} from '../actions/cart.actions';
import { createReducer, on } from '@ngrx/store';

export const CartReducer = createReducer(
	initialCartState,

	on(addCartProduct, (state, { cartProduct }) => {
		state.cartProducts.push(cartProduct);
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(updateCartProduct, (state, { orderItem }) => {
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

	on(removeCartProduct, (state, { cartProductId }) => ({
		...state,
		cartProducts: state.cartProducts.filter((product) => product.id !== cartProductId),
		loading: false,
		error: false,
	})),

	on(increaseProductQuantity, (state, { cartProduct }) => {
		const productIndex = state.cartProducts.findIndex((cartProd) => cartProd.id == cartProduct.id);
		state.cartProducts[productIndex].quantity++;
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(decreaseProductQuantity, (state, { cartProduct }) => {
		const productIndex = state.cartProducts.findIndex((cartProd) => cartProd.id == cartProduct.id);
		state.cartProducts[productIndex].quantity--;
		return {
			...state,
			loading: false,
			error: false,
		};
	}),

	on(checkoutCart, (state) => ({
		...state,
		loading: true,
	})),

	on(checkoutCartSuccess, (state) => ({
		...state,
		cartProducts: [],
		loading: false,
		error: false,
	})),

	on(checkoutCartFailure, (state) => ({
		...state,
		loading: false,
		error: true,
	}))
);
