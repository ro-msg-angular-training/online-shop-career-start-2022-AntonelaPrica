import { createAction, props } from '@ngrx/store';
import { CartProduct } from '../../model/CartProduct';
import { OrderItem } from '../../model/OrderItem';

export const addCartProduct = createAction('[ADD C. PROD] Add Cart Product', props<{ cartProduct: CartProduct }>());
export const updateCartProduct = createAction('[UPD C. PROD] Update Cart Product', props<{ orderItem: OrderItem }>());
export const removeCartProduct = createAction('[DEL C. PROD] Remove Cart Product', props<{ cartProductId: number }>());
export const increaseProductQuantity = createAction(
	'[INC Quantity] Increment Product Quantity',
	props<{ cartProduct: CartProduct }>()
);
export const decreaseProductQuantity = createAction(
	'[DEC Quantity] Decrement Product Quantity',
	props<{ cartProduct: CartProduct }>()
);
export const checkoutCart = createAction('[Checkout] Checkout Cart', props<{ cartProducts: CartProduct[] }>());
export const checkoutCartSuccess = createAction('[Checkout] Checkout Cart Success');
export const checkoutCartFailure = createAction('[Checkout] Checkout Cart Failure', props<{ error: any }>());
