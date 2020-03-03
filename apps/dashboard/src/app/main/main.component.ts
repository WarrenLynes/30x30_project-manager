import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { emptyProject, Project } from '@thirty-for-thirty-progress-tracker/core-data';
import { ProjectsFacade } from '@thirty-for-thirty-progress-tracker/core-state';
import { Router } from '@angular/router';

@Component({
  selector: 'thirty-for-thirty-progress-tracker-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;
  project$: Observable<Project> = this.projectsFacade.selectedProject$;
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private projectsFacade: ProjectsFacade,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.projectsFacade.loadProjects();
  }

  onSelectProject(projectId: any) {
    this.projectsFacade.selectProject(projectId);
    // this.router.navigateByUrl('projects/' + projectId);
  }

  onCreateProject(project) {
    this.projectsFacade.createProject(project);
  }

  saveProject(project: Project) {
    this.projectsFacade.saveProject(project);
  }

  onDeleteProject(projectId:any) {
    this.projectsFacade.deleteProject(projectId)
  }
}
