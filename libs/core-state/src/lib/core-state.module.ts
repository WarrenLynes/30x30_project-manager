import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from '@thirty-for-thirty-progress-tracker/core-data';
import { reducers } from '.';
import { AuthEffects } from './auth/auth.effects';
import { MaterialModule } from '@thirty-for-thirty-progress-tracker/material';
import { ProjectsEffects } from './projects/effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    MaterialModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      AuthEffects,
      ProjectsEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'projectEvents Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
