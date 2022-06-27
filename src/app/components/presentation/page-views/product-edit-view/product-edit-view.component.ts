import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-product-edit-view',
	templateUrl: './product-edit-view.component.html',
	styleUrls: ['./product-edit-view.component.scss'],
})
export class ProductEditViewComponent {
	// @ts-ignore
	@Input() productForm: FormGroup;
	@Input() disabled: boolean = false;

	@Output() saveEvent: EventEmitter<void> = new EventEmitter<void>();
	@Output() cancelEvent: EventEmitter<void> = new EventEmitter<void>();
}
