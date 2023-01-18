import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from '../service/user-login.service';
import { routingGuard } from './routing.guard';

@Injectable({
	providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
	constructor(private router: Router, private userLoginService: UserLoginService) {}

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		return routingGuard('/products', this.router, this.userLoginService.isUserCustomer);
	}
}
