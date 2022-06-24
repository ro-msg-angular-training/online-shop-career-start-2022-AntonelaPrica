import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from '../service/user-login.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private router: Router, private userLoginService: UserLoginService) {}

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		let userIsLoggedIn = this.userLoginService.isUserAdmin;
		if (userIsLoggedIn) {
			return userIsLoggedIn;
		} else {
			await this.router.navigateByUrl('/products');
			return false;
		}
	}
}
