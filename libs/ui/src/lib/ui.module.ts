import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '@thirty-for-thirty-progress-tracker/material';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [DetailComponent, NotFoundComponent, ListComponent, ProjectFormComponent],
  exports: [DetailComponent, NotFoundComponent, ListComponent, ProjectFormComponent]
})
export class UiModule {}
