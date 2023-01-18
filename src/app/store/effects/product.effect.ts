import { Injectable } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../model/Product';
import { of } from 'rxjs';
import {
	AddProduct,
	AddProductFailure,
	AddProductSuccess,
	DeleteProduct,
	DeleteProductFailure,
	DeleteProductSuccess,
	GetProduct,
	GetProductFailure,
	GetProductSuccess,
	UpdateProduct,
	UpdateProductFailure,
	UpdateProductSuccess,
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
			ofType(AddProduct),
			switchMap((props) =>
				this.productsService.addProduct(props.product).pipe(
					map((product) => AddProductSuccess({ product: product })),
					catchError((err) => of(AddProductFailure({ error: err })))
				)
			)
		)
	);

	addProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AddProductSuccess),
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
				ofType(AddProductFailure),
				tap(() => {
					this.utilityService.displayMessage('Cannot add the product');
				})
			),
		{ dispatch: false }
	);

	getProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GetProduct),
			switchMap((props) =>
				this.productsService.getProduct(props.productId).pipe(
					map((product: Product) => GetProductSuccess({ product: product })),
					catchError((err) => of(GetProductFailure({ error: err })))
				)
			)
		)
	);

	// getProductSuccess$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(GetProductSuccess),
	// 			tap((props) => {
	// 				this.router.navigate(['/products', props.product.id]);
	// 			})
	// 		),
	// 	{ dispatch: false }
	// );

	updateProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UpdateProduct),
			switchMap((props) =>
				this.productsService.updateProduct(props.product).pipe(
					map(() => UpdateProductSuccess()),
					catchError((err) => of(UpdateProductFailure({ error: err })))
				)
			)
		)
	);

	updateProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UpdateProductSuccess),
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
				ofType(UpdateProductFailure),
				tap(() => {
					this.utilityService.displayMessage('Product cannot be updated');
				})
			),
		{ dispatch: false }
	);

	deleteProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DeleteProduct),
			switchMap((props) =>
				this.productsService.deleteProduct(props.productId).pipe(
					map(() => DeleteProductSuccess()),
					catchError((err) => of(DeleteProductFailure({ error: err })))
				)
			)
		)
	);

	deleteProductSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DeleteProductSuccess),
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
				ofType(DeleteProductFailure),
				tap(() => {
					this.utilityService.displayMessage('Cannot delete the product');
				})
			),
		{ dispatch: false }
	);
}
