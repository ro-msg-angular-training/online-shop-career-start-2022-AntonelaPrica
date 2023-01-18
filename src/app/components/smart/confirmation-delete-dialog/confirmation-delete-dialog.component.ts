import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { DeleteProduct } from '../../../store/actions/product.actions';

@Component({
	selector: 'app-confirmation-delete-dialog',
	templateUrl: './confirmation-delete-dialog.component.html',
	styleUrls: [],
})
export class ConfirmationDeleteDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ConfirmationDeleteDialogComponent>,
		private store: Store<AppState>,
		@Inject(MAT_DIALOG_DATA) public data: { productId: number }
	) {}

	onCloseDialog(): void {
		this.dialogRef.close();
	}

	onYesClick(): void {
		this.onCloseDialog();
		this.store.dispatch(DeleteProduct({ productId: this.data.productId }));
	}
}
