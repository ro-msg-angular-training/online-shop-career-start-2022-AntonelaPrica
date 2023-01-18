import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import {
	AddCartProduct,
	CheckoutCart,
	CheckoutCartFailure,
	CheckoutCartSuccess,
	UpdateCartProduct,
} from '../actions/cart.actions';
import { of } from 'rxjs';
import { UtilityService } from '../../service/utility.service';
import { CartState } from '../states/cart.state';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { selectCartProducts } from '../selectors/cart.selectors';


@Injectable()
export class CartEffects {
	constructor(
		private cartService: CartService,
		private utilityService: UtilityService,
		private actions$: Actions,
		private router: Router,
		private store: Store<AppState>
	) {}

	addCartProduct$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AddCartProduct),
				tap(() => {
					this.utilityService.displayMessage('Product added to cart');
				})
			),
		{ dispatch: false }
	);

	updateCartProduct$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UpdateCartProduct), 
				withLatestFrom(this.store.select(selectCartProducts)),
		// 		tap((cartProducts) =>
		// 		{
		// 			const cartProductIdx = cartProducts.findIndex((product) => product.id === orderItem.productId);
		// if (cartProductIdx !== -1) {
		// 	cartProducts[cartProductIdx].quantity = orderItem.quantity;
		// }
		// 		} )
								
			),
		{ dispatch: false }
	);

	checkoutCart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CheckoutCart),
			switchMap((props) =>
				this.cartService.checkoutCart(props.cartProducts).pipe(
					map(() => CheckoutCartSuccess()),
					catchError((err) => of(CheckoutCartFailure({ error: err })))
				)
			)
		)
	);

	checkoutCartSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(CheckoutCartSuccess),
				tap(() => {
					this.utilityService.displayMessage('Order completed');
					this.router.navigateByUrl('/products');
				})
			),
		{ dispatch: false }
	);

	checkoutCartFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(CheckoutCartFailure),
				tap(() => {
					this.utilityService.displayMessage('Cannot create order');
				})
			),
		{ dispatch: false }
	);
}
