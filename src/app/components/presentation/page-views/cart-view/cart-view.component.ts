import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct } from '../../../../model/CartProduct';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-cart-view',
	templateUrl: './cart-view.component.html',
	styleUrls: [],
})
export class CartViewComponent {
	@Input() cartProducts!: MatTableDataSource<CartProduct>;
	@Input() displayedColumns: string[] = [];

	@Output() removeCartProductEvent: EventEmitter<number> = new EventEmitter<number>();
	@Output() decreaseQuantityEvent: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
	@Output() increaseQuantityEvent: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
	@Output() checkoutEvent: EventEmitter<CartProduct[]> = new EventEmitter<CartProduct[]>();
}
