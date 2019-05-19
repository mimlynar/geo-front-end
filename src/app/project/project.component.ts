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
  }

  private getCurrentProject() {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
      this.polarTasks = project.polarTasks;
    });
  }

  private getCurrentProjectId(): void {
    this.route.params.subscribe(parameters => this.projectId = parameters['projectId']);
  }

  delete(task: PolarTask) {
    this.polarService.remove(task.id)
      .subscribe(() => this.removeTaskFromList(task));
  }

  private removeTaskFromList(task: PolarTask) {
    let index: number = this.polarTasks.indexOf(task);
    if (index !== -1) {
      this.polarTasks.splice(index, 1);
    }
  }

}
