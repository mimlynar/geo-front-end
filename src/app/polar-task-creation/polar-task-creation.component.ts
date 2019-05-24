import {Component, OnInit} from '@angular/core';
import {PolarTask} from "../polarTask";
import {ActivatedRoute, Router} from "@angular/router";
import {PolarService} from "../polar.service";
import {Point} from "../point";

@Component({
  selector: 'app-new-task',
  templateUrl: './polar-task-creation.component.html',
  styleUrls: ['./polar-task-creation.component.css']
})
export class PolarTaskCreationComponent implements OnInit {

  task: PolarTask = new PolarTask();
  projectId: number;

  constructor(
    private router: Router,
    private taskService: PolarService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getCurrentProjectId();
  }

  create(): void {
    this.prepareNewPolarTask();
    this.taskService.save(this.task)
      .subscribe(task =>this.redirectToTaskView(task));
  }

  private prepareNewPolarTask() {
    this.task.projectId = this.projectId;
    this.task.observations = [];
    let standPoint = new Point();
    this.task.observations.forEach(o=>o.target=standPoint);
  }

  redirectToProject() {
    this.router.navigate(["projects", this.projectId]);
  }

  private redirectToTaskView(task) {
     this.router.navigate(["projects", this.projectId, "task", task.id]);
  }

  private getCurrentProjectId() {
    this.route.params.subscribe(params => this.projectId = params['projectId']);
  }
}
