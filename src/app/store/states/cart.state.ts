import { CartProduct } from '../../model/CartProduct';

export interface CartState {
	cartProducts: CartProduct[];
	loading: boolean;
	error: boolean;
}

export const initialCartState: CartState = {
	cartProducts: [],
	loading: false,
	error: false,
};
