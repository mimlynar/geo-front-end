import {Component, OnInit} from '@angular/core';
import {Point} from "../../point";
import {PolarObservation} from "../../polarObservation";
import {PolarService} from "../../services/polar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PolarTask} from "../../polarTask";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {PointService} from "../../services/point.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

const DIRECTION_DISTANCE_VALIDATOR = Validators.pattern("^([-]?)+[0-9]+([.]?[0-9]+)?$");

interface FlatPolarObservation {
  idObservation: number,
  idDistance: number,
  idDirection: number,
  distance: number,
  direction: number,
  targetId: number,
  targetNumber: string,
  reference: boolean,
  targetX: number,
  targetY: number
}
@Component({
  selector: 'app-polar-task',
  templateUrl: './polar-task.component.html',
  styleUrls: ['./polar-task.component.css']
})
export class PolarTaskComponent implements OnInit {

  taskForm: FormGroup;

  task: PolarTask;
  taskId: number;
  projectId: number;
  standPoint: Point;
  observations: PolarObservation[] = [];
  resolvedStandPoints$: Observable<Point[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private polarService: PolarService,
    private route: ActivatedRoute,
    private router: Router,
    private pointService: PointService,
    private fb: FormBuilder
  ) {
  }


  selectStandPoint(point: Point) {
    this.standPoint = point;
  }

  get getFormData(): FormArray {
    return <FormArray>this.taskForm.get('observations');
  }

  ngOnInit() {
    this.initObservationsTable();
    this.loadCurrentProjectId();
    this.loadCurrentTaskId();
    this.loadPolarTaskAndObservations();
    this.resolvedStandPoints$ = this.registerStandPointAutocomplete();
  }

  fillPolarTaskTableWithObservations() {
    const pointsTable = <FormArray>this.taskForm.get('observations');
    for (const observation of this.observations) {
      const grp = this.fb.group({
        idObservation: [observation.id],
        reference: [observation.reference],
        targetNumber: [observation.target.number, Validators.required],
        targetId: [observation.target.id],
        targetX: [observation.target.x],
        targetY: [observation.target.y],
        direction: [observation.direction, [DIRECTION_DISTANCE_VALIDATOR]],
        idDirection: [observation.directionId],
        distance: [observation.distance, [DIRECTION_DISTANCE_VALIDATOR]],
        idDistance: [observation.distanceId]
      });
      pointsTable.push(grp);
    }
  }

  save() {
    let observations: PolarObservation[] = this.getFormData.controls.map(control => this.mapObservation(control));
    this.task.observations = observations;
    this.polarService.save(this.task).subscribe(() => this.ngOnInit());
  }

  private registerStandPointAutocomplete() {
    return this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((pointNumber: string) => this.pointService.getPointsByNameAndProject(pointNumber, this.projectId)));
  }

  searchPointsByName(term: string): void {
    this.searchTerms.next(term);
  }

  resolveTask(): void {
    let observations: PolarObservation[] = this.getFormData.controls.map(observation => this.mapObservation(observation));
    this.polarService.resolve(observations)
      .subscribe(observations => {
          this.observations = observations;
          this.initObservationsTable();
          this.fillPolarTaskTableWithObservations();
          this.save()
        }
      );
  }

  saveAndClose() {
    let observations: PolarObservation[] = this.getFormData.controls.map(control => this.mapObservation(control));
    this.task.observations = observations;
    this.polarService.save(this.task).subscribe();
    this.router.navigate(["projects", this.projectId]);
  }

  addNewObservations() {
    const control = this.getFormData;
    control.push(this.createNewEmptyRow());
  }

  createNewEmptyRow(): FormGroup {
    return this.fb.group({
      idObservation: undefined,
      reference: false,
      targetNumber: ['', Validators.required],
      distance: ['', [DIRECTION_DISTANCE_VALIDATOR]],
      direction: ['', [DIRECTION_DISTANCE_VALIDATOR]],
      targetX: [''],
      targetY: ['']
    });
  }

  private resolveStandPoint(task) {
    this.standPoint = task.observations.length > 0 ? task.observations[0].stand : this.createNewPoint();
  }

  createNewPointWithName(pointNumber: string): Point {
    const point = this.createNewPoint();
    point.number = pointNumber;
    return point;
  }

  private createNewPoint(): Point {
    const point = new Point();
    point.projectId = this.projectId;
    return point;
  }

  private loadCurrentTaskId() {
    this.route.params.subscribe(params => this.taskId = params['taskId']);
  }

  private loadCurrentProjectId() {
    this.route.params
      .subscribe(params => this.projectId = params['projectId']);
  }

  delete(index: number) {
    const control = this.getFormData;
    control.removeAt(index);
  }

  private initObservationsTable() {
    this.taskForm = this.fb.group({
      observations: this.fb.array([])
    });
  }

  private loadPolarTaskAndObservations() {
    this.polarService.getOne(this.taskId)
      .subscribe(task => {
        this.task = task;
        this.observations = task.observations;
        this.resolveStandPoint(task);
        this.fillPolarTaskTableWithObservations();
      });
  }

  private mapObservation(control: AbstractControl): PolarObservation {
    let observationControl = control.value as FlatPolarObservation;
    let observation = new PolarObservation();
    observation.reference = observationControl.reference;
    observation.distance = observationControl.distance;
    observation.direction = observationControl.direction;
    observation.distanceId = observationControl.idDistance;
    observation.directionId = observationControl.idDirection;
    observation.id = observationControl.idObservation;
    observation.target = this.extractTargetFromObservationControl(observationControl);
    observation.stand = this.standPoint
    return observation;
  }

  private extractTargetFromObservationControl(observationControl) {
    let target = new Point();
    target.id = observationControl.targetId;
    target.x = observationControl.targetX
    target.y = observationControl.targetY;
    target.number = observationControl.targetNumber;
    target.projectId = this.projectId;
    return target;
  }
}
