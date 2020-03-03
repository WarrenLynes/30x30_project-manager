import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '@thirty-for-thirty-progress-tracker/core-data';
import { ActivatedRoute } from '@angular/router';
import { ProjectsFacade } from '@thirty-for-thirty-progress-tracker/core-state';
import { filter, first, map, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'thirty-for-thirty-progress-tracker-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  item$: Observable<Project> = this.photosFacade.selectedProject$;

  @Input() selectedItem: Project;

  constructor(private route: ActivatedRoute, private photosFacade: ProjectsFacade) { }

  ngOnInit(): void {

    this.photosFacade.loadProjects();
    this.photosFacade.selectedProject$.pipe(
      withLatestFrom(this.route.paramMap),
      filter(([x, xx]) => !x || !x.id && xx.has('id')),
    ).subscribe(([x,xx]) => {
      this.photosFacade.selectProject(xx.get('id'));
    });
  }

}
