import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-login-page-view',
	templateUrl: './login-page-view.component.html',
	styleUrls: ['./login-page-view.component.scss'],
})
export class LoginPageViewComponent {
	// @ts-ignore
	@Input() loginForm: FormGroup;
	@Output() loginEvent: EventEmitter<void> = new EventEmitter<void>();
}
