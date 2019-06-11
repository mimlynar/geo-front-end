import {Injectable} from '@angular/core';
import {Project} from "../project";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private endPoint = 'http://localhost:9999/project';

  constructor(
  private http: HttpClient) {
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.endPoint);
  }

  getOne(projectId: number): Observable<Project> {
    let endPoint = this.endPoint + "/" + projectId;
    return this.http.get<Project>(endPoint);
  }

  save(project: Project): Observable<Project> {
    return this.http.post<Project>(this.endPoint, project);
  }

  remove(project: Project): Observable<Project> {
    let endPoint = this.endPoint + "/" + project.id;
    return this.http.delete<Project>(endPoint, httpOptions);
  }
}
