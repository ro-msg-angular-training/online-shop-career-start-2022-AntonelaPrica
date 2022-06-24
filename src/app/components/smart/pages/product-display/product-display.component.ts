import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../model/Product';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteDialogComponent } from '../../confirmation-delete-dialog/confirmation-delete-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { UserLoginService } from '../../../../service/user-login.service';

@Component({
	selector: 'app-product-display',
	templateUrl: './product-display.component.html',
	styleUrls: ['./product-display.component.scss'],
})
export class ProductDisplayComponent implements OnInit {
	product: Product;
	disabled: boolean = true;
	productForm: FormGroup;
	isCurrentUserAdmin: boolean;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		public dialog: MatDialog,
		private store: Store<AppState>,
		private userLoginService: UserLoginService
	) {
		this.product = this.router.getCurrentNavigation()!.extras.queryParams!['product'];

		this.productForm = this.formBuilder.group({
			name: new FormControl({ value: this.product?.name, disabled: this.disabled }),
			category: new FormControl({ value: this.product?.category, disabled: this.disabled }),
			price: new FormControl({ value: this.product?.price, disabled: this.disabled }),
			description: new FormControl({ value: this.product?.description, disabled: this.disabled }),
			image: new FormControl({ value: this.product?.image, disabled: this.disabled }),
		});

		this.isCurrentUserAdmin = userLoginService.isUserAdmin;
	}

	ngOnInit(): void {}

	onEditProduct() {
		this.router.navigate(['/products', this.product.id, 'edit'], { queryParams: { product: this.product } });
	}

	onDeleteProduct() {
		this.dialog.open(ConfirmationDeleteDialogComponent, {
			width: '30%',
			data: { productId: this.product.id },
		});
	}
}
