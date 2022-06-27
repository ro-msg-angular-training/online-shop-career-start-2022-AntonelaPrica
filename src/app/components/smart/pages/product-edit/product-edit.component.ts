import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../model/Product';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { updateProduct } from '../../../../store/actions/product.actions';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
	product: Product;
	productForm: FormGroup;

	constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
		this.product = this.router.getCurrentNavigation()!.extras.queryParams!['product'];

		this.productForm = this.formBuilder.group({
			name: new FormControl(this.product?.name, [Validators.required]),
			category: new FormControl(this.product?.category, [Validators.required]),
			price: new FormControl(this.product?.price, [Validators.pattern('^[0-9]*$')]),
			description: new FormControl(this.product?.description),
			image: new FormControl(this.product?.image),
		});
	}

	ngOnInit(): void {}

	onCancelEdit() {
		this.router.navigateByUrl('/products');
	}

	onSaveEdit() {
		let updatedProduct: Product = {
			id: this.product.id,
			name: this.productForm.get('name')?.value,
			category: this.productForm.get('category')?.value,
			price: this.productForm.get('price')?.value,
			description: this.productForm.get('description')?.value,
			image: this.productForm.get('image')?.value,
		};
		this.store.dispatch(updateProduct({ product: updatedProduct }));
	}
}
