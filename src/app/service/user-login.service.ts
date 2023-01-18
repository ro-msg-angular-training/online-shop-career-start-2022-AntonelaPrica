import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../model/UserCredentials';
import { UserDetails } from '../model/UserDetails';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class UserLoginService {
	constructor(private http: HttpClient) {}

	login(userCredentials: UserCredentials): Observable<UserDetails> {
		return this.http.post<UserDetails>('/api/login', userCredentials);
	}

	get isLoggedIn() {
		return !_.isNil(localStorage.getItem('username'));
	}

	get isUserAdmin() {
		return _.eq(localStorage.getItem('roles')?.includes('admin'), true);
	}

	get isUserCustomer() {
		return _.eq(localStorage.getItem('roles')?.includes('customer'), true);
	}

	get currentUsername() {
		return localStorage.getItem('username');
	}
}
