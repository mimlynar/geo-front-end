import {Injectable} from '@angular/core';
import {Project} from "./project";
import {Observable, of} from "rxjs";
import {PROJECTS} from "./projects-mock";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }


  getProject(projectId: number): Observable<Project> {
    return of(PROJECTS[0]);
  }

  save(project: Project) {
    log("project " + project.name + " saved");
  }
}
