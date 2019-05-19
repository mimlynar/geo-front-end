import {Component, OnInit} from '@angular/core';
import {PolarTask} from "../polarTask";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {PolarService} from "../polar.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './polar-task-creation.component.html',
  styleUrls: ['./polar-task-creation.component.css']
})
export class PolarTaskCreationComponent implements OnInit {

  task: PolarTask;
  projectId: number;

  constructor(
    private location: Location,
    private router: Router,
    private taskService: PolarService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.task = new PolarTask();
    this.getCurrentProjectId();
  }

  close(): void {
    this.location.back();
  }

  create(): void {
    this.task.projectId = this.projectId;
    this.task.observations = [];
    this.taskService.save(this.task)
      .subscribe(task =>this.redirectToTaskView(task));
  }

  private redirectToTaskView(task) {
     this.router.navigate(["projects", this.projectId, "task", task.id]);
  }

  private getCurrentProjectId() {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      console.log(this.projectId)
    });
  }
}
