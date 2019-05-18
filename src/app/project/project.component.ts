import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project} from "../project";
import {PolarTask} from "../polarTask";
import {PolarService} from "../polar.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId: number;
  project: Project;
  polarTasks: PolarTask[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private polarService: PolarService) {
  }

  ngOnInit() {
    this.getCurrentProjectId();
    this.getCurrentProject();
    this.loadPolarTask();
  }

  private getCurrentProject() {
    this.projectService.getProject(this.projectId).subscribe(project => this.project = project);
  }

  private getCurrentProjectId(): void {
    this.route.params.subscribe(parameters => this.projectId = parameters['projectId']);
  }

  private loadPolarTask() {
    this.polarService.findTasksByProjectId(this.projectId).subscribe(tasks => this.polarTasks = tasks);
  }

}
