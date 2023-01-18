import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../model/Product';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { selectIsError, selectIsLoading, selectProducts } from '../../../../store/selectors/product-list.selectors';
import { GetProduct } from '../../../../store/actions/product.actions';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { AddCartProduct, UpdateCartProduct } from '../../../../store/actions/cart.actions';
import { selectCartProducts } from '../../../../store/selectors/cart.selectors';
import { UserLoginService } from '../../../../service/user-login.service';
import { GetProductList } from '../../../../store/actions/product-list.actions';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: [],
})
export class ProductListComponent implements OnInit, OnDestroy {
	products: MatTableDataSource<Product> = new MatTableDataSource<Product>();
	displayedColumns = ['category', 'name', 'price', 'addToCart', 'details'];
	isLoading$: Observable<boolean> | undefined;
	isError$: Observable<boolean> | undefined;
	isCurrentUserAdmin!: boolean;
	isCurrentUserCustomer!: boolean;
	subscriptions: Subscription = new Subscription();

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private userLoginService: UserLoginService
	) {

	}

	ngOnInit(): void {
		this.isCurrentUserAdmin = this.userLoginService.isUserAdmin;
		this.isCurrentUserCustomer = this.userLoginService.isUserCustomer;

		if (!this.isCurrentUserCustomer) {
			this.displayedColumns = this.displayedColumns.filter((col) => col != 'addToCart');
		}

		this.store.dispatch(GetProductList());
		this.isLoading$ = this.store.select(selectIsLoading);
		this.isError$ = this.store.select(selectIsError);
		this.subscriptions.add(this.store.select(selectProducts).subscribe((products) => (this.products.data = products)));
	}

	onProductClick(id: number) {
		// this.store.dispatch(GetProduct({ productId: id })); // move to the display page
		return this.router.navigate(['/products', id]);
	}

	async onAddToCart(product: Product) {
		const cartProducts = await firstValueFrom(this.store.select(selectCartProducts));
		let cartProduct = cartProducts.find((cartProduct) => cartProduct.id === product.id);
		if (cartProduct) {
			this.store.dispatch(
				UpdateCartProduct({
					orderItem: {
						productId: cartProduct.id,
						quantity: cartProduct.quantity + 1,
					},
				})
			);
			return;
		}
		this.store.dispatch(
			AddCartProduct({
				cartProduct: {
					id: product.id,
					quantity: 1,
					name: product.name,
					price: product.price,
					category: product.category,
				},
			})
		);

	}

	onCartClick() {
		this.router.navigateByUrl('/cart');
	}

	onAddProduct() {
		this.router.navigateByUrl('/products/create');
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
