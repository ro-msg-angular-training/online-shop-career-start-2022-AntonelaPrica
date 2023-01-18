import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProduct } from '../../../../model/CartProduct';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { selectCartProducts, selectIsError, selectIsLoading } from '../../../../store/selectors/cart.selectors';
import { MatTableDataSource } from '@angular/material/table';
import {
	CheckoutCart,
	DecreaseProductQuantity,
	IncreaseProductQuantity,
	RemoveCartProduct,
} from '../../../../store/actions/cart.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
	displayedColumns = ['category', 'name', 'price', 'quantity', 'remove'];
	cartProducts: MatTableDataSource<CartProduct> = new MatTableDataSource<CartProduct>();
	isLoading$: Observable<boolean> | undefined;
	isError$: Observable<boolean> | undefined;
	subscriptions: Subscription = new Subscription();

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.subscriptions.add(this.store.select(selectCartProducts).subscribe((products) => (this.cartProducts.data = products)));
		this.isLoading$ = this.store.select(selectIsLoading);
		this.isError$ = this.store.select(selectIsError);
	}

	onCheckout(products: CartProduct[]) {
		this.store.dispatch(CheckoutCart({ cartProducts: products }));
	}

	onRemoveCartProduct(productId: number) {
		this.store.dispatch(RemoveCartProduct({ cartProductId: productId }));
	}

	onDecreaseQuantity(cartProduct: CartProduct) {
		this.store.dispatch(DecreaseProductQuantity({ cartProduct: cartProduct }));
	}

	onIncreaseQuantity(cartProduct: CartProduct) {
		this.store.dispatch(IncreaseProductQuantity({ cartProduct: cartProduct }));
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
