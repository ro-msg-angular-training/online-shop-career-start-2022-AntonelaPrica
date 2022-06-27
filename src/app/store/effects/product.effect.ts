import { Injectable } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../model/Product';
import { of } from 'rxjs';
import {
	addProduct,
	addProductFailure,
	addProductSuccess,
	deleteProduct,
	deleteProductFailure,
	deleteProductSuccess,
	getProduct,
	getProductFailure,
	getProductSuccess,
	updateProduct,
	updateProductFailure,
	updateProductSuccess,
} from '../actions/product.actions';
import { Router } from '@angular/router';
import { UtilityService } from '../../service/utility.service';

@Injectable()
export class ProductEffects {
	constructor(
		private productsService: ProductsService,
		private utilityService: UtilityService,
		private actions$: Actions,
		private router: Router
	) {}

	addProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addProduct),
			switchMap((props) =>
				this.productsService.addProduct(props.product).pipe(
					map((product) => addProductSuccess({ product: product })),
					catchError((err) => of(addProductFailure({ error: err })))
				)
			)
		)
	);

	addProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addProductSuccess),
				tap(() => {
					this.utilityService.displayMessage('Product was added');
					this.router.navigateByUrl('/products');
				})
			),
		{ dispatch: false }
	);

	addProductFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addProductFailure),
				tap(() => {
					this.utilityService.displayMessage('Cannot add the product');
				})
			),
		{ dispatch: false }
	);

	getProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getProduct),
			switchMap((props) =>
				this.productsService.getProduct(props.productId).pipe(
					map((product: Product) => getProductSuccess({ product: product })),
					catchError((err) => of(getProductFailure({ error: err })))
				)
			)
		)
	);

	getProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(getProductSuccess),
				tap((props) => {
					this.router.navigate(['/products', props.product.id], { queryParams: { product: props.product } });
				})
			),
		{ dispatch: false }
	);

	updateProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateProduct),
			switchMap((props) =>
				this.productsService.updateProduct(props.product).pipe(
					map(() => updateProductSuccess()),
					catchError((err) => of(updateProductFailure({ error: err })))
				)
			)
		)
	);

	updateProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(updateProductSuccess),
				tap(() => {
					this.utilityService.displayMessage('Product updated');
					this.router.navigateByUrl('/products');
				})
			),
		{ dispatch: false }
	);

	updateProductFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(updateProductFailure),
				tap(() => {
					this.utilityService.displayMessage('Product cannot be updated');
				})
			),
		{ dispatch: false }
	);

	deleteProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteProduct),
			switchMap((props) =>
				this.productsService.deleteProduct(props.productId).pipe(
					map(() => deleteProductSuccess()),
					catchError((err) => of(deleteProductFailure({ error: err })))
				)
			)
		)
	);

	deleteProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(deleteProductSuccess),
				tap(() => {
					this.utilityService.displayMessage('Product was deleted');
					this.router.navigateByUrl('/products');
				})
			),
		{ dispatch: false }
	);

	deleteProductFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(deleteProductFailure),
				tap(() => {
					this.utilityService.displayMessage('Cannot delete the product');
				})
			),
		{ dispatch: false }
	);
}
