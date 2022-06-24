import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/Product';

export const addProduct = createAction('[ADD Product] Add Product', props<{ product: Product }>());
export const addProductSuccess = createAction('[ADD Product] Add Product Success', props<{ product: Product }>());
export const addProductFailure = createAction('[ADD Product] Add Product Failure', props<{ error: any }>());

export const getProduct = createAction('[GET Product] Get product', props<{ productId: number }>());
export const getProductSuccess = createAction('[GET Product] Get Product Success', props<{ product: Product }>());
export const getProductFailure = createAction('[GET Product] Get Product Failure', props<{ error: any }>());

export const updateProduct = createAction('[UPD Product] Update Product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[UPD Product] Update Product Success');
export const updateProductFailure = createAction('[UPD Product] Update Product Failure', props<{ error: any }>());

export const deleteProduct = createAction('[DEL Product] Delete Product', props<{ productId: number }>());
export const deleteProductSuccess = createAction('[DEL Product] Delete Product Success');
export const deleteProductFailure = createAction('[DEL Product] Delete Product Failure', props<{ error: any }>());
