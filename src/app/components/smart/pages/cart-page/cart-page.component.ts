import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../../../model/CartProduct';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { selectCartProducts, selectIsError, selectIsLoading } from '../../../../store/selectors/cart.selectors';
import { MatTableDataSource } from '@angular/material/table';
import {
	checkoutCart,
	decreaseProductQuantity,
	increaseProductQuantity,
	removeCartProduct,
} from '../../../../store/actions/cart.actions';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
	displayedColumns = ['category', 'name', 'price', 'quantity', 'remove'];
	cartProducts: MatTableDataSource<CartProduct> = new MatTableDataSource<CartProduct>();
	isLoading$: Observable<boolean> | undefined;
	isError$: Observable<boolean> | undefined;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.select(selectCartProducts).subscribe((products) => (this.cartProducts.data = products));
		this.isLoading$ = this.store.select(selectIsLoading);
		this.isError$ = this.store.select(selectIsError);
	}

	onCheckout(products: CartProduct[]) {
		this.store.dispatch(checkoutCart({ cartProducts: products }));
	}

	onRemoveCartProduct(productId: number) {
		this.store.dispatch(removeCartProduct({ cartProductId: productId }));
	}

	onDecreaseQuantity(cartProduct: CartProduct) {
		this.store.dispatch(decreaseProductQuantity({ cartProduct: cartProduct }));
	}

	onIncreaseQuantity(cartProduct: CartProduct) {
		this.store.dispatch(increaseProductQuantity({ cartProduct: cartProduct }));
	}
}
