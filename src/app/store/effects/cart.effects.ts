import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import {
	addCartProduct,
	checkoutCart,
	checkoutCartFailure,
	checkoutCartSuccess,
	updateCartProduct,
} from '../actions/cart.actions';
import { of } from 'rxjs';
import { UtilityService } from '../../service/utility.service';

@Injectable()
export class CartEffects {
	constructor(
		private cartService: CartService,
		private utilityService: UtilityService,
		private actions$: Actions,
		private router: Router
	) {}

	addCartProduct$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addCartProduct),
				tap(() => {
					this.utilityService.displayMessage('Product added to cart');
				})
			),
		{ dispatch: false }
	);

	updateCartProduct$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(updateCartProduct),
				tap(() => {
					this.utilityService.displayMessage('Product added to cart');
				})
			),
		{ dispatch: false }
	);

	checkoutCart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(checkoutCart),
			switchMap((props) =>
				this.cartService.checkoutCart(props.cartProducts).pipe(
					map(() => checkoutCartSuccess()),
					catchError((err) => of(checkoutCartFailure({ error: err })))
				)
			)
		)
	);

	checkoutCartSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(checkoutCartSuccess),
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
				ofType(checkoutCartFailure),
				tap(() => {
					this.utilityService.displayMessage('Cannot create order');
				})
			),
		{ dispatch: false }
	);
}
