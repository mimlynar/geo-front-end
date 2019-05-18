import {Injectable} from '@angular/core';
import {Project} from "./project";
import {Observable, of} from "rxjs";
import {PROJECTS} from "./projects-mock";
import {log} from "util";
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

  private projectUrl = 'http://localhost:9999/project';

  constructor(
  private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }


  getProject(projectId: number): Observable<Project> {
    let endPointUrl = this.projectUrl+ "/" + projectId;
    return this.http.get(endPointUrl);
  }

  save(project: Project): Observable<Project> {
    log("project " + project.name + " saved");
    return this.http.post<Project>(this.projectUrl, project);
  }

  remove(project: Project): Observable<Object> {
  let endPointUrl = this.projectUrl+ "/" + project.id;
    log("project " + project.name + " removing");
    return this.http.delete(endPointUrl, httpOptions);
  }
}
