import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/Product';

export const GetProductList = createAction('[GET Products] Get Product list');
export const GetProductListSuccess = createAction(
	'[GET Products] Get Product List Success',
	props<{ products: Product[] }>()
);
export const GetProductListFailure = createAction('[GET Products] Get Product List Failure', props<{ error: any }>());
