import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../service/products.service';
import { getProductList, getProductListFailure, getProductListSuccess } from '../actions/product-list.actions';

@Injectable()
export class ProductListEffects {
	constructor(private productsService: ProductsService, private actions$: Actions) {}

	getProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getProductList),
			switchMap(() =>
				this.productsService.getAllProducts().pipe(
					map((products) => getProductListSuccess({ products: products })),
					catchError((err) => of(getProductListFailure({ error: err })))
				)
			)
		)
	);
}
