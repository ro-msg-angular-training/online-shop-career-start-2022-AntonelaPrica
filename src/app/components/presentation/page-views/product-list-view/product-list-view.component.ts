import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../model/Product';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-product-list-view',
	templateUrl: './product-list-view.component.html',
	styleUrls: [],
})
export class ProductListViewComponent {
	@Input() products!: MatTableDataSource<Product>;
	@Input() displayedColumns: string[] = [];
	@Input() isCurrentUserAdmin: boolean | null | undefined;
	@Input() isCurrentUserCustomer: boolean | null | undefined;

	@Output() goToCartEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() productDetailsEvent: EventEmitter<number> = new EventEmitter<number>();
	@Output() addProductEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() addToCartEvent: EventEmitter<Product> = new EventEmitter<Product>();
}
