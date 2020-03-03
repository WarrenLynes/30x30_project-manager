import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'thirty-for-thirty-progress-tracker-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnChanges {

  form: FormGroup;

  @Input() selectedProject;

  constructor(
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selectedProject) {
      this.buildForm();
    }
  }

  submitProject() {
    this.dialogRef.close({...this.data, ...this.form.value});
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(this.data.description, Validators.compose([
        Validators.required
      ])),
      progress: new FormControl(this.data.progress, Validators.compose([
        Validators.required
      ])),
      githubUrl: new FormControl(this.data.githubUrl, Validators.compose([
        Validators.required
      ])),
      apiUrl: new FormControl(this.data.apiUrl, Validators.compose([
        Validators.required
      ])),
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
