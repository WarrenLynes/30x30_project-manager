import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isInitialized, isLoading } from './app.reducer';
import { select, Store } from '@ngrx/store';
import { AppState } from '../';
import { addLoad, appInit, removeLoad } from './app.actions';
import { refreshToken } from '../auth/auth.actions';

@Injectable({providedIn: 'root'})
export class AppFacade {

  initialized$ = this.store.pipe(select(isInitialized));
  loading$ = this.store.pipe(select(isLoading));

  constructor(
    private store: Store<AppState>
  ) {}

  initialize() {
    this.store.dispatch(appInit());
    const token = localStorage.getItem('TOKEN');
    if(token)
      this.store.dispatch(refreshToken({token}))
  }

  addLoad(loadId: string) {
    this.store.dispatch(addLoad({loadId}));
  }

  removeLoad(loadId: string) {
    this.store.dispatch(removeLoad({loadId}));
  }
}
