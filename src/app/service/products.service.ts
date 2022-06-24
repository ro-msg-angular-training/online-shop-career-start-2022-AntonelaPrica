import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	constructor(private http: HttpClient) {}

	getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>('/api/products');
	}

	getProduct(id: number): Observable<Product> {
		return this.http.get<Product>(`/api/products/${id}`);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(`/api/products`, product);
	}

	updateProduct(product: Product): Observable<void> {
		return this.http.put<void>(`/api/products/${product.id}`, product);
	}

	deleteProduct(id: number): Observable<void> {
		return this.http.delete<void>(`/api/products/${id}`);
	}
}
