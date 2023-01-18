import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/states/app.state';
import { UserCredentials } from '../../../../model/UserCredentials';
import { Observable } from 'rxjs';
import { selectAuthIsLoading } from '../../../../store/selectors/auth.selectors';
import { LoginUser } from '../../../../store/actions/auth.actions';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [],
})
export class LoginPageComponent implements OnInit {
	isLoading$: Observable<boolean> | undefined;
	loginForm!: FormGroup;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.isLoading$ = this.store.select(selectAuthIsLoading);
		this.loginForm = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
		});
	}

	loginUser() {
		const payload: UserCredentials = this.loginForm.value;
		this.store.dispatch(LoginUser({ userCredentials: payload }));
	}
}
