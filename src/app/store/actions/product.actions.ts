import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/Product';

export const AddProduct = createAction('[ADD Product] Add Product', props<{ product: Product }>());
export const AddProductSuccess = createAction('[ADD Product] Add Product Success', props<{ product: Product }>());
export const AddProductFailure = createAction('[ADD Product] Add Product Failure', props<{ error: any }>());

export const GetProduct = createAction('[GET Product] Get product', props<{ productId: number }>());
export const GetProductSuccess = createAction('[GET Product] Get Product Success', props<{ product: Product }>());
export const GetProductFailure = createAction('[GET Product] Get Product Failure', props<{ error: any }>());

export const UpdateProduct = createAction('[UPD Product] Update Product', props<{ product: Product }>());
export const UpdateProductSuccess = createAction('[UPD Product] Update Product Success');
export const UpdateProductFailure = createAction('[UPD Product] Update Product Failure', props<{ error: any }>());

export const DeleteProduct = createAction('[DEL Product] Delete Product', props<{ productId: number }>());
export const DeleteProductSuccess = createAction('[DEL Product] Delete Product Success');
export const DeleteProductFailure = createAction('[DEL Product] Delete Product Failure', props<{ error: any }>());
