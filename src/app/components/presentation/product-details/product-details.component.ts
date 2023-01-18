import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: [],
})
export class ProductDetailsComponent {
	@Input() productForm: FormGroup | undefined;
	@Input() disable: boolean = false;
}
