import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../model/Product';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { addProduct } from '../../../../store/actions/product.actions';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
	productForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		category: new FormControl('', [Validators.required]),
		price: new FormControl('', [Validators.pattern('^[0-9]*$')]),
		description: new FormControl(''),
		image: new FormControl(''),
	});

	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {}

	onSaveProduct() {
		let newProduct: Product = {
			id: 0,
			name: this.productForm.get('name')?.value,
			category: this.productForm.get('category')?.value,
			price: this.productForm.get('price')?.value,
			description: this.productForm.get('description')?.value,
			image: this.productForm.get('image')?.value,
		};
		this.store.dispatch(addProduct({ product: newProduct }));
	}

	onCancelProduct() {
		this.router.navigateByUrl('/products');
	}
}
