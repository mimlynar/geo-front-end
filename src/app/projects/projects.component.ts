import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {Project} from "../project";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectCreationComponent} from "../project-creation/project-creation.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal
  ) {
  }

  open() {
    const modalRef = this.modalService.open(ProjectCreationComponent);
  }

  ngOnInit() {
    this.loadProjects();
  }

  delete(project: Project) {
    let index: number = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  private loadProjects() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }
}
