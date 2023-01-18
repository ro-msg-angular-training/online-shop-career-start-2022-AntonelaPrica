import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from '../../confirmation-delete-dialog/confirmation-delete-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { UserLoginService } from '../../../../service/user-login.service';
import { selectCurrentProduct } from 'src/app/store/selectors/product.selectors';
import { GetProduct } from 'src/app/store/actions/product.actions';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product-display',
	templateUrl: './product-display.component.html',
	styleUrls: [],
})
export class ProductDisplayComponent implements OnInit, OnDestroy {
	product!: Product | null;
	disabled: boolean = true;
	productForm!: FormGroup;
	isCurrentUserAdmin: boolean;
	subscriptions: Subscription = new Subscription();

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private userLoginService: UserLoginService,
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute
	) {
		this.isCurrentUserAdmin = this.userLoginService.isUserAdmin;

		this.activatedRoute.params.subscribe(params => {
			this.store.dispatch(GetProduct({ productId: params['id'] }));
		});
	}

	ngOnInit(): void {
		this.subscriptions.add(this.store.select(selectCurrentProduct).subscribe((product) => {
			this.product = product;

			this.productForm = new FormGroup({
				name: new FormControl({ value: this.product?.name, disabled: this.disabled }),
				category: new FormControl({ value: this.product?.category, disabled: this.disabled }),
				price: new FormControl({ value: this.product?.price, disabled: this.disabled }),
				description: new FormControl({ value: this.product?.description, disabled: this.disabled }),
				image: new FormControl({ value: this.product?.image, disabled: this.disabled }),
			});
		}));
	}

	onEditProduct() {
		return this.router.navigate(['/products', this.product?.id, 'edit']);
	}

	onDeleteProduct() {
		this.dialog.open(ConfirmationDeleteDialogComponent, {
			width: '30%',
			data: { productId: this.product?.id },
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
