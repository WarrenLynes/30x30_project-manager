import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authenticated, IUser, loading } from './auth.reducer';
import { Credentials } from '@thirty-for-thirty-progress-tracker/core-data';
import { Store } from '@ngrx/store';
import { authenticate as authenticateAction, logout, register} from './auth.actions';
import { AppState } from '../index';


@Injectable({providedIn: 'root'})
export class AuthFacade {
  get authenticated$(): Observable<boolean> {
    return this.store.select(authenticated);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(loading);
  }

  constructor(private store: Store<AppState>) {}

  authenticate({email, password}) {
    this.store.dispatch(authenticateAction({email, password}));
  }

  register({email, password, phone, name}) {
    this.store.dispatch(register({email, password, phone, name}));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
