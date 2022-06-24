import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../model/UserCredentials';
import { UserDetails } from '../model/UserDetails';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserLoginService {
	constructor(private http: HttpClient) {}

	login(userCredentials: UserCredentials): Observable<UserDetails> {
		return this.http.post<UserDetails>('/api/login', userCredentials);
	}

	get isLoggedIn() {
		return !!localStorage.getItem('username');
	}

	get isUserAdmin() {
		return !!localStorage.getItem('roles')?.includes('admin');
	}

	get isUserCustomer() {
		return !!localStorage.getItem('roles')?.includes('customer');
	}

	get currentUsername() {
		return localStorage.getItem('username');
	}
}
