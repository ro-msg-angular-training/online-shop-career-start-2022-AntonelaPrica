import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from '../service/user-login.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private userLoginService: UserLoginService) {}

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		const userIsLoggedIn = this.userLoginService.isLoggedIn;
		if (userIsLoggedIn) {
			return userIsLoggedIn;
		} else {
			await this.router.navigateByUrl('/login');
			return false;
		}
	}
}
