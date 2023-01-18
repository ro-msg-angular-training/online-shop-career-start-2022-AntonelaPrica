import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../model/Product';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { AddProduct } from '../../../../store/actions/product.actions';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: [],
})
export class AddProductComponent implements OnInit {

	productForm!: FormGroup;

	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {
		this.productForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			category: new FormControl('', [Validators.required]),
			price: new FormControl('', [Validators.pattern('^[0-9]*$')]),
			description: new FormControl(''),
			image: new FormControl(''),
		});
	}

	onSaveProduct() {
		let newProduct: Product = {
			id: 0,
			name: this.productForm.value.name,
			category: this.productForm.value.category,
			price: this.productForm.value.price,
			description: this.productForm.value.description,
			image: this.productForm.value.image,
		};
		this.store.dispatch(AddProduct({ product: newProduct }));
	}

	onCancelProduct() {
		this.router.navigateByUrl('/products');
	}
}
