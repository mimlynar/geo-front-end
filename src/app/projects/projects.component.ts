import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {Project} from "../project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  delete(project: Project) {
    this.projectService.remove(project)
      .subscribe(() => this.removeProjectFromList(project));
  }

  private removeProjectFromList(project: Project) {
    let index: number = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  private loadProjects() {
    this.projectService.getAll()
      .subscribe(projects => this.projects = projects);
  }
}
