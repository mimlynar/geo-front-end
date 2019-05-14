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
  standPoint: Point;
  observations: PolarObservation[] = [];

  ngOnInit() {
    this.loadPolarTask();
    this.extractObservations();
    this.initializeStandPoint();
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
    let id = this.getCurrentTaskId();
    this.polarService.get(id)
      .subscribe(task => this.task = task);
  }

  private getCurrentTaskId(): number {
    let idFromUrl = this.route.snapshot.paramMap.get('id');
    return idFromUrl !== null ? +idFromUrl : null;
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

  private extractObservations(): void {
    if (this.task.observations) {
      this.observations = this.task.observations;
    }
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
