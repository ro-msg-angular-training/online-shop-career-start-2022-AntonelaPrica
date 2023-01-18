import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-product-display-view',
	templateUrl: './product-display-view.component.html',
	styleUrls: [],
})
export class ProductDisplayViewComponent {
	@Input() productForm!: FormGroup;
	@Input() disabled: boolean = false;
	@Input() isCurrentUserAdmin: boolean | null | undefined;

	@Output() deleteProductEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() editProductEvent: EventEmitter<void> = new EventEmitter<void>();
}
