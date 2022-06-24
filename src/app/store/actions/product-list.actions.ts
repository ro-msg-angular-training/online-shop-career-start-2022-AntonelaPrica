import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/Product';

export const getProductList = createAction('[GET Products] Get Product list');
export const getProductListSuccess = createAction(
	'[GET Products] Get Product List Success',
	props<{ products: Product[] }>()
);
export const getProductListFailure = createAction('[GET Products] Get Product List Failure', props<{ error: any }>());
