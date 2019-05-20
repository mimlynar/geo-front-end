import {Component, OnInit} from '@angular/core';
import {Point} from "../point";
import {PolarObservation} from "../polarObservation";
import {PolarService} from "../polar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PolarTask} from "../polarTask";

@Component({
  selector: 'app-polar-task',
  templateUrl: './polar-task.component.html',
  styleUrls: ['./polar-task.component.css']
})
export class PolarTaskComponent implements OnInit {

  constructor(
    private polarService: PolarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  task: PolarTask;
  taskId: number;
  projectId: number;
  standPoint: Point;
  observations: PolarObservation[] = [];

  ngOnInit() {
    this.getCurrentProjectId();
    this.getCurrentTaskId();
    this.loadPolarTaskAndObservations();
  }

  save(): void {
    this.polarService.save(this.task);
  }

  addEmptyRows(): void {
    this.task.observations.push(this.createNewEntry());
  }

  delete(observation: PolarObservation) {
    let index: number = this.observations.indexOf(observation);
    if (index !== -1) {
      this.observations.splice(index, 1);
    }
  }

  resolveTask(): void {
    this.polarService.resolve(this.task.observations)
      .subscribe(observations => this.task.observations = observations);
  }

  redirectToProject() {
    this.router.navigate(["projects", this.projectId]);
  }

  private loadPolarTaskAndObservations() {
    this.polarService.getOne(this.taskId)
      .subscribe(task => {
        this.task = task;
        this.observations = task.observations;
        this.resolveStandPoint(task);
      });
  }

  private resolveStandPoint(task) {
    this.standPoint = task.observations.length > 0 ? task.observations[0].stand : new Point();
  }

  private getCurrentTaskId() {
    this.route.params.subscribe(params => this.taskId = params['taskId']);
  }

  private createNewEntry(): PolarObservation {
    let observation: PolarObservation = new PolarObservation();
    observation.target = new Point();
    return observation;
  }

  private getCurrentProjectId() {
    this.route.params.subscribe(params => this.projectId = params['projectId']);
  }
}
