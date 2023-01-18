import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../model/Product';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { GetProduct, UpdateProduct } from '../../../../store/actions/product.actions';
import { Subscription } from 'rxjs';
import { selectCurrentProduct } from 'src/app/store/selectors/product.selectors';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: [],
})
export class ProductEditComponent implements OnInit, OnDestroy{
	product!: Product | null;
	productForm!: FormGroup;
	subscriptions: Subscription = new Subscription();

	constructor(private router: Router, private store: Store<AppState>, private activatedRoute: ActivatedRoute) {
		this.subscriptions.add(this.activatedRoute.params.subscribe(params => {

			this.store.dispatch(GetProduct({ productId: params['id'] }));

		}));
	}

	ngOnInit(): void {
		this.subscriptions.add(this.store.select(selectCurrentProduct).subscribe((product) => {
			this.product = product;

			this.productForm = new FormGroup({
				name: new FormControl(this.product?.name, [Validators.required]),
				category: new FormControl(this.product?.category, [Validators.required]),
				price: new FormControl(this.product?.price, [Validators.pattern('^[0-9]*$')]),
				description: new FormControl(this.product?.description),
				image: new FormControl(this.product?.image),
			});
		}));
	}

	onCancelEdit() {
		return this.router.navigateByUrl('/products');
	}

	onSaveEdit() {
		const updatedProduct: Product = {
			id: this.product?.id ? this.product?.id : -1,
			name: this.productForm.value.name,
			category: this.productForm.value.category,
			price: this.productForm.value.price,
			description: this.productForm.value.description,
			image: this.productForm.value.image,
		};
		this.store.dispatch(UpdateProduct({ product: updatedProduct }));
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
