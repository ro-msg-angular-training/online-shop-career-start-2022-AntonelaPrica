import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../service/products.service';
import { GetProductList, GetProductListFailure, GetProductListSuccess } from '../actions/product-list.actions';

@Injectable()
export class ProductListEffects {
	constructor(private productsService: ProductsService, private actions$: Actions) {}

	getProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GetProductList),
			switchMap(() =>
				this.productsService.getAllProducts().pipe(
					map((products) => GetProductListSuccess({ products: products })),
					catchError((err) => of(GetProductListFailure({ error: err })))
				)
			)
		)
	);
}
