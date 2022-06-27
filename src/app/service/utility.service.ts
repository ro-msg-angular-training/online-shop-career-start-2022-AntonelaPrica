import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	constructor(private snackBarUserMessage: MatSnackBar) {}

	displayMessage(message: string) {
		this.snackBarUserMessage.open(message, '', { duration: 2000 });
	}
}
