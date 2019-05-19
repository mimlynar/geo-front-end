import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-project',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {

  project: Project = new Project();

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  createProject(): void {
    this.projectService.save(this.project)
      .subscribe(success => this.redirectToProjects());
  }

  private redirectToProjects() {
    this.router.navigate(["projects"]);
  }

}
