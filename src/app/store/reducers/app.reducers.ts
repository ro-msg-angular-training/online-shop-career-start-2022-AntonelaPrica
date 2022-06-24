import { AppState } from '../states/app.state';
import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './auth.reducers';
import { ProductListReducer } from './product-list.reducers';
import { CartReducer } from './cart.reducers';
import { ProductReducer } from './product.reducers';

export const AppReducers: ActionReducerMap<AppState, any> = {
	authState: AuthReducer,
	productListState: ProductListReducer,
	productState: ProductReducer,
	cartState: CartReducer,
};
