import { createAction, props } from '@ngrx/store';
import { CartProduct } from '../../model/CartProduct';
import { OrderItem } from '../../model/OrderItem';

export const AddCartProduct = createAction('[ADD C. PROD] Add Cart Product', props<{ cartProduct: CartProduct }>());
export const UpdateCartProduct = createAction('[UPD C. PROD] Update Cart Product', props<{ orderItem: OrderItem }>());
export const RemoveCartProduct = createAction('[DEL C. PROD] Remove Cart Product', props<{ cartProductId: number }>());
export const IncreaseProductQuantity = createAction(
	'[INC Quantity] Increment Product Quantity',
	props<{ cartProduct: CartProduct }>()
);
export const DecreaseProductQuantity = createAction(
	'[DEC Quantity] Decrement Product Quantity',
	props<{ cartProduct: CartProduct }>()
);
export const CheckoutCart = createAction('[Checkout] Checkout Cart', props<{ cartProducts: CartProduct[] }>());
export const CheckoutCartSuccess = createAction('[Checkout] Checkout Cart Success');
export const CheckoutCartFailure = createAction('[Checkout] Checkout Cart Failure', props<{ error: any }>());
