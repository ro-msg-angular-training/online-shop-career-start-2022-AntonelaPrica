import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartProduct } from '../model/CartProduct';
import { Order } from '../model/Order';
import { UserLoginService } from './user-login.service';
import { OrderItem } from '../model/OrderItem';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	constructor(private http: HttpClient, private userLoginService: UserLoginService) {}

	checkoutCart(cartProducts: CartProduct[]): Observable<any> {
		const options: any = { responseType: 'text' };
		let currentUser = this.userLoginService.currentUsername;
		let order: Order = { customer: currentUser ?? '', products: [] };
		for (let cartProduct of cartProducts) {
			let orderItem: OrderItem = { productId: cartProduct.id, quantity: cartProduct.quantity };
			order.products.push(orderItem);
		}
		return this.http.post(`/api/orders`, order, options);
	}
}
