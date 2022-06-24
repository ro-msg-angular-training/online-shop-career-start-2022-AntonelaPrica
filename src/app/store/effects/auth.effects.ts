import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { UserLoginService } from '../../service/user-login.service';
import { UserDetails } from '../../model/UserDetails';
import { UtilityService } from '../../service/utility.service';
import { loginUser, loginUserFailure, loginUserSuccess } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
	constructor(
		private authService: UserLoginService,
		private utilityService: UtilityService,
		private actions$: Actions,
		private router: Router
	) {}

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginUser),
			switchMap((props) =>
				this.authService.login(props.userCredentials).pipe(
					map((user: UserDetails) => loginUserSuccess({ userDetails: user })),
					catchError((err) => of(loginUserFailure({ error: err })))
				)
			)
		)
	);

	loginSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginUserSuccess),
				tap((props) => {
					localStorage.setItem('username', props.userDetails.username);
					localStorage.setItem('roles', props.userDetails.roles.toString());
					this.router.navigateByUrl('/products');
				})
			),
		{ dispatch: false }
	);

	loginError$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginUserFailure),
				tap(() => this.utilityService.displayMessage('User does not exist!'))
			),
		{ dispatch: false }
	);
}
