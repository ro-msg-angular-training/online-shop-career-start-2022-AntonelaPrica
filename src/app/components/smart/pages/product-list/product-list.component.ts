import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../model/Product';
import { ProductsService } from '../../../../service/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { selectIsError, selectIsLoading, selectProducts } from '../../../../store/selectors/product-list.selectors';
import { getProduct } from '../../../../store/actions/product.actions';
import { firstValueFrom, Observable } from 'rxjs';
import { addCartProduct, updateCartProduct } from '../../../../store/actions/cart.actions';
import { selectCartProducts } from '../../../../store/selectors/cart.selectors';
import { UserLoginService } from '../../../../service/user-login.service';
import { getProductList } from '../../../../store/actions/product-list.actions';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
	products: MatTableDataSource<Product> = new MatTableDataSource<Product>();
	displayedColumns = ['category', 'name', 'price', 'addToCart', 'details'];
	isLoading$: Observable<boolean> | undefined;
	isError$: Observable<boolean> | undefined;
	isCurrentUserAdmin: boolean;
	isCurrentUserCustomer: boolean;

	constructor(
		private productsService: ProductsService,
		private router: Router,
		private store: Store<AppState>,
		private userLoginService: UserLoginService
	) {
		this.isCurrentUserAdmin = userLoginService.isUserAdmin;
		this.isCurrentUserCustomer = userLoginService.isUserCustomer;

		if (!this.isCurrentUserCustomer) {
			this.displayedColumns = this.displayedColumns.filter((col) => col != 'addToCart');
		}
	}

	ngOnInit(): void {
		this.store.dispatch(getProductList());
		this.isLoading$ = this.store.select(selectIsLoading);
		this.isError$ = this.store.select(selectIsError);
		this.store.select(selectProducts).subscribe((products) => (this.products.data = products));
	}

	onProductClick(id: number) {
		this.store.dispatch(getProduct({ productId: id }));
	}

	async onAddToCart(product: Product) {
		const cartProducts = await firstValueFrom(this.store.select(selectCartProducts));
		let cartProduct = cartProducts.find((cartProduct) => cartProduct.id === product.id);
		if (cartProduct) {
			this.store.dispatch(
				updateCartProduct({
					orderItem: {
						productId: cartProduct.id,
						quantity: cartProduct.quantity + 1,
					},
				})
			);
		} else {
			this.store.dispatch(
				addCartProduct({
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
	}

	onCartClick() {
		this.router.navigateByUrl('/cart');
	}

	onAddProduct() {
		this.router.navigateByUrl('/products/create');
	}
}
