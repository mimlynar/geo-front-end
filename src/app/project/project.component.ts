import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project} from "../project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId: number;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getCurrentProjectId();
    this.getCurrentProject();
  }

  private getCurrentProject() {
    this.projectService.getProject(this.projectId).subscribe(project => this.project = project);
  }

  private getCurrentProjectId(): void {
    this.route.params.subscribe(parameters => this.projectId = parameters['projectId']);
  }

}
