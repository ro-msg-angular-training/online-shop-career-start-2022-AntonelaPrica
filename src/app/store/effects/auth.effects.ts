import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { UserLoginService } from '../../service/user-login.service';
import { UserDetails } from '../../model/UserDetails';
import { UtilityService } from '../../service/utility.service';
import { LoginUser, LoginUserFailure, LoginUserSuccess } from '../actions/auth.actions';

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
			ofType(LoginUser),
			switchMap((props) =>
				this.authService.login(props.userCredentials).pipe(
					map((user: UserDetails) => LoginUserSuccess({ userDetails: user })),
					catchError((err) => of(LoginUserFailure({ error: err })))
				)
			)
		)
	);

	loginSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(LoginUserSuccess),
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
				ofType(LoginUserFailure),
				tap(() => this.utilityService.displayMessage('User does not exist!'))
			),
		{ dispatch: false }
	);
}
