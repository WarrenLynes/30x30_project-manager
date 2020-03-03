import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { ProjectsFacade } from './facade';
import * as projectsActions from './actions';
import { Project, ProjectsService, SnackbarService } from '@thirty-for-thirty-progress-tracker/core-data';
import { ProjectsPartialState } from './reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProjects, {
      run: (
        action: ReturnType<typeof projectsActions.loadProjects>,
        state: ProjectsPartialState
      ) => {
        this.appFacade.addLoad('[PROJECTS][LOAD]');
        return this.projectsService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Projects')),
          map((projects: Project[]) => projectsActions.projectsLoaded({ projects: projects})),
          tap(() => this.appFacade.removeLoad('[PROJECTS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.loadProjects>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.createProject, {
      run: (
        action: ReturnType<typeof projectsActions.createProject>,
        state: ProjectsPartialState
      ) => {
        this.appFacade.addLoad('[PROJECTS][CREATE]');

        return this.projectsService.create(action.project).pipe(
          map((project: Project) => projectsActions.projectCreated({ project })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Project')),
          tap(() => this.appFacade.removeLoad('[PROJECTS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.createProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.updateProject, {
      run: (
        action: ReturnType<typeof projectsActions.updateProject>,
        state: ProjectsPartialState
      ) => {
        this.appFacade.addLoad('[PROJECTS][UPDATE]');

        return this.projectsService.update(action.project).pipe(
          map((project: any) => projectsActions.projectUpdated({ project })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Project')),
          tap(() => this.appFacade.removeLoad('[PROJECTS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.updateProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.deleteProject, {
      run: (
        action: ReturnType<typeof projectsActions.deleteProject>,
        state: ProjectsPartialState
      ) => {
        this.appFacade.addLoad('[PROJECTS][DELETE]');
        return this.projectsService.delete(action.projectId).pipe(
          map((projectId: any) => projectsActions.projectDeleted({projectId})),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Project')),
          tap(() => this.projectsFacade.loadProjects()),
          tap(() => this.appFacade.removeLoad('[PROJECTS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.deleteProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>,
    private projectsService: ProjectsService,
    private projectsFacade: ProjectsFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
