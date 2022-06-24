import { createAction, props } from '@ngrx/store';
import { UserCredentials } from '../../model/UserCredentials';
import { UserDetails } from '../../model/UserDetails';

export const loginUser = createAction('[Auth] Login', props<{ userCredentials: UserCredentials }>());
export const loginUserSuccess = createAction('[Auth] Login Success', props<{ userDetails: UserDetails }>());
export const loginUserFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
