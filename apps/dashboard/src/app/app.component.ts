import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade, ProjectsFacade } from '@thirty-for-thirty-progress-tracker/core-state';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { MatDialog } from '@angular/material';
import { ProjectFormComponent } from '@thirty-for-thirty-progress-tracker/ui';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'thirty-for-thirty-progress-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  app_title = environment.APP_TITLE;
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  destroy$: Subject<boolean> = new Subject();
  loading = false;

  links = [
    // {path: '', title: '', icon: ''},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private cdRef: ChangeDetectorRef,
    private projectsFacade: ProjectsFacade,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.appFacade.initialize();

    this.appFacade.loading$.subscribe((xx) => {
      this.loading = xx;
      this.cdRef.detectChanges();
    });

    this.projectsFacade.selectedProject$.pipe(
      takeUntil(this.destroy$),
      tap((x) => {
        if(x.id) {
          this.openDialog(x);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogout(): void {
    this.authFacade.logout();
  }

  onAddProject() {
    this.openDialog();
  }

  openDialog(project?) {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: project ? project : {name: '', description: '', progress: 0}
    });

    dialogRef.afterClosed().subscribe((res => {
      if(res) {
        if(res.id){
          this.projectsFacade.updateProject(res);
        } else {
          this.projectsFacade.createProject(res);
        }
      }
      this.projectsFacade.selectProject(null);
    }));
  }

}
