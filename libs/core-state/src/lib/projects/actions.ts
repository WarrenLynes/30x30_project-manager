import { createAction, props } from '@ngrx/store';
import { Project } from '@thirty-for-thirty-progress-tracker/core-data';

export const projectSelected = createAction(
  '[PROJECTS][SELECTED]',
  props<{ selectedProjectId: string }>()
);
export const loadProjects = createAction(
  '[PROJECTS][LOAD]'
);
export const projectsLoaded = createAction(
  '[PROJECTS][LOADED]',
  props<{ projects: Project[] }>()
);
export const createProject = createAction(
  '[PROJECTS][CREATE]',
  props<{ project: Project }>()
);
export const projectCreated = createAction(
  '[PROJECTS][CREATED]',
  props<{ project: Project }>()
);
export const updateProject = createAction(
  '[PROJECTS][UPDATE]',
  props<{ project: Project }>()
);
export const projectUpdated = createAction(
  '[PROJECTS][UPDATED]',
  props<{ project: Project }>()
);
export const deleteProject = createAction(
  '[PROJECTS][DELETE]',
  props<{ projectId: any }>()
);
export const projectDeleted = createAction(
  '[PROJECTS][DELETED]',
  props<{ projectId: any }>()
);
