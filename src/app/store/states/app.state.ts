import { AuthState, initialAuthState } from './auth.state';
import { initialProductListState, ProductListState } from './product-list.state';
import { CartState, initialCartState } from './cart.state';
import { initialProductState, ProductState } from './product.state';

export interface AppState {
	authState: AuthState;
	productListState: ProductListState;
	productState: ProductState;
	cartState: CartState;
}

const initialAppState: AppState = {
	authState: initialAuthState,
	productListState: initialProductListState,
	productState: initialProductState,
	cartState: initialCartState,
};
