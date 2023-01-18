import { createAction, props } from '@ngrx/store';
import { UserCredentials } from '../../model/UserCredentials';
import { UserDetails } from '../../model/UserDetails';

export const LoginUser = createAction('[Auth] Login', props<{ userCredentials: UserCredentials }>());
export const LoginUserSuccess = createAction('[Auth] Login Success', props<{ userDetails: UserDetails }>());
export const LoginUserFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
