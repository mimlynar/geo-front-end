import {Injectable} from '@angular/core';
import {Project} from "./project";
import {Observable, of} from "rxjs";
import {PROJECTS} from "./projects-mock";
import {log} from "util";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl= 'http://localhost:8080/project';

  constructor(
  private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }


  getProject(projectId: number): Observable<Project> {
    return of(PROJECTS[0]);
  }

  save(project: Project) {
    this.http.post<Project>(this.projectUrl, project).subscribe();
    log("project " + project.name + " saved");
  }

  remove(project: Project){
  let endPointUrl = this.projectUrl+ "/" + project.id;
    this.http.delete(endPointUrl, httpOptions).subscribe();
    log("project " + project.name + " removed");
  }
}
