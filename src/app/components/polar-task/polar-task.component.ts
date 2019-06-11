import {Component, OnInit} from '@angular/core';
import {Point} from "../../point";
import {PolarObservation} from "../../polarObservation";
import {PolarService} from "../../services/polar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PolarTask} from "../../polarTask";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {PointService} from "../../services/point.service";

@Component({
  selector: 'app-polar-task',
  templateUrl: './polar-task.component.html',
  styleUrls: ['./polar-task.component.css']
})
export class PolarTaskComponent implements OnInit {

  constructor(
    private polarService: PolarService,
    private route: ActivatedRoute,
    private router: Router,
    private pointService: PointService
  ) {
  }

  task: PolarTask;
  taskId: number;
  projectId: number;
  standPoint: Point;
  observations: PolarObservation[] = [];
  promptedPoints$: Observable<Point[]>;
  private searchTerms = new Subject<string>();

  selectStandPoint(point: Point) {
    this.standPoint = point;
  }

  ngOnInit() {
    this.getCurrentProjectId();
    this.getCurrentTaskId();
    this.loadPolarTaskAndObservations();
    this.promptedPoints$ = this.searchTerms.pipe(

      debounceTime(300),
      distinctUntilChanged(),
      switchMap((pointNumber: string) => this.pointService.getPointsPyNameAndProject(pointNumber, this.projectId)));

  }

  searchPointsByName(term: string): void {
    this.searchTerms.next(term);
  }

  save(): void {
    this.assignStandPoint();
    this.task.observations = this.observations;
    this.polarService.save(this.task).subscribe(success=>this.loadPolarTaskAndObservations());
  }

  addEmptyRows(): void {
    this.observations.push(this.createNewEntry());
  }

  delete(observation: PolarObservation) {
    let index: number = this.observations.indexOf(observation);
    if (index !== -1) {
      this.observations.splice(index, 1);
    }
  }

  resolveTask(): void {
    this.assignStandPoint();
    this.polarService.resolve(this.observations)
      .subscribe(observations => this.observations=observations);
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
    this.standPoint = task.observations.length > 0 ? task.observations[0].stand : this.createNewPoint();
  }

  private createNewPoint() : Point{
    var point = new Point();
    point.projectId = this.projectId;
    return point;
  }

   createNewPointWithName(pointNumber: string): Point {
    const point = this.createNewPoint();
    point.number = pointNumber;
    return point;
  }

  private getCurrentTaskId() {
    this.route.params.subscribe(params => this.taskId = params['taskId']);
  }

  private createNewEntry(): PolarObservation {
    let observation: PolarObservation = new PolarObservation();
    observation.target = this.createNewPoint();
    return observation;
  }

  private getCurrentProjectId() {
    this.route.params.subscribe(params => this.projectId = params['projectId']);
  }

  private assignStandPoint() {
    this.observations.forEach(o => o.stand = this.standPoint);
  }
}
