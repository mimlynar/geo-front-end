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

  private projectUrl = 'http://localhost:9999/project';


  constructor(
    private polarService: PolarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  task: PolarTask;
  taskId: number;
  standPoint: Point = new Point();
  observations: PolarObservation[] = [];

  ngOnInit() {
    this.getCurrentTaskId();
    this.loadPolarTask();
    //this.initializeStandPoint();
  }

  addEmptyRows(): void {
    this.task.observations.push(this.createNewEntry());
  }

  resolveTask(): void {
    this.assignStandPoint();
    this.polarService.resolve(this.task.observations)
      .subscribe(observations => this.task.observations = observations);
  }

  save(): void {
    this.polarService.save(this.task);
  }

  goBack() {
    this.router.navigateByUrl("projects/" + this.getCurrentProjectId());
  }

  delete(observation: PolarObservation) {
    let index: number = this.observations.indexOf(observation);
    if (index !== -1) {
      this.observations.splice(index, 1);
    }
  }

  private loadPolarTask() {
    this.polarService.get(this.taskId)
      .subscribe(task => {
        this.task = task;
        this.observations = task.observations
      });
  }

  private getCurrentTaskId() {
    this.route.params.subscribe(params => {
      this.taskId = params['taskId'], console.log(this.taskId)
    });
  }

  private isValueUndefined(value: any): boolean {
    return typeof value === 'undefined' || value === null
  }

  private createNewEntry(): PolarObservation {
    let observation: PolarObservation = new PolarObservation();
    observation.target = new Point();
    return observation;
  }

  private assignStandPoint(): void {
    this.observations.forEach(observation => observation.stand = this.standPoint);
  }

  private initializeStandPoint(): void {
    this.standPoint = this.resolveStandPoint();
  }

  private resolveStandPoint(): Point {
    let firstObservation = this.observations[0];
    if (firstObservation) {

      if (!this.isValueUndefined(firstObservation.stand)) {
        return firstObservation.stand;
      }
    }

    if (this.isValueUndefined(this.standPoint)) {
      return new Point();
    }
  }

  private getCurrentProjectId(): number {
    let idFromUrl = this.route.snapshot.paramMap.get('projectId');
    return idFromUrl !== null ? +idFromUrl : null;
  }
}
