import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Project } from './model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  private baseUrl = '/api/projects';

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get(this.baseUrl).pipe(
      map((x: Project[]) => x.map((xx) => ({...xx, id: xx._id})))
    );
  }

  create(project: Project) {
    return this.httpClient.post(this.baseUrl, {project}).pipe(
      map((x: any) => ({...x, id: x._id}))
    );
  }

  getUrlForId(id) {
    return `${this.baseUrl}/${id}`;
  }

  update(model) {
    return this.httpClient.put(this.getUrlForId(model.id), model).pipe(
      map((x: any) => ({...x, id: x._id}))
    )
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId)).pipe(
      map((x: any) => ({...x, id: x._id}))
    )
  }
}
