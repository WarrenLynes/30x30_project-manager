import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromProjects from './projects/reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  projects: fromProjects.reducer,
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  projects: {ids: [] } as fromProjects.ProjectsState,
};
