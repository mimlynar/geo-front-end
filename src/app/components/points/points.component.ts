import {Component, OnInit} from '@angular/core';
import {Point} from "../../point";
import {PointService} from "../../services/point.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../project";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

const POINT_VALIDATOR = Validators.pattern("^([-]?)+[0-9]+([.]?[0-9]+)$");

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {


  points: Point[] = [];
  projectId: number;
  project: Project;
  pointsForm: FormGroup;

  constructor(
    private pointService: PointService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {

  }

  get getFormData(): FormArray {
    return <FormArray>this.pointsForm.get('points');
  }

  ngOnInit() {
    this.loadCurrentProjectId();
    this.initPointsTable();
    this.loadProjectPoints();
    this.loadCurrentProject();
  }

  save() {
    let points: Point[] = this.getFormData.controls.map(control => this.mapData(control));
    this.pointService.save(points).subscribe();
  }

  addNewPoint() {
    const control = this.getFormData;
    control.push(this.createNewEmptyRow());
  }

  delete(index: number) {
    const control = this.getFormData;
    let point = this.retrievePointFromControlsByIndex(index);
    control.removeAt(index);
    if (point) {
      this.pointService.delete(point).subscribe();
    }
  }

  fillTableWithPoints() {
    const pointsTable = <FormArray>this.pointsForm.get('points');
    for (const point of this.points) {
      const grp = this.fb.group({
        id: [point.id],
        number: [point.number, Validators.required],
        x: [point.x, [Validators.required, POINT_VALIDATOR]],
        y: [point.y, [Validators.required, POINT_VALIDATOR]],
      });
      pointsTable.push(grp);
    }
  }

  createNewEmptyRow(): FormGroup {
    return this.fb.group({
      id: undefined,
      number: ['', Validators.required],
      x: ['', [Validators.required, POINT_VALIDATOR]],
      y: ['', [Validators.required, POINT_VALIDATOR]]
    });
  }

  private retrievePointFromControlsByIndex(index: number): Point {
    const controls = this.getFormData;
    let pointId = controls.at(index).value.id;
    return this.points.find(value => value.id === pointId);
  }

  private initPointsTable() {
    this.pointsForm = this.fb.group({
      points: this.fb.array([])
    });
  }

  private loadProjectPoints() {
    this.pointService.getPointsForProject(this.projectId)
      .subscribe(points => {
        this.points = points;
        this.fillTableWithPoints();
      });
  }

  goToProject() {
    this.router.navigate(["projects", this.projectId]);
  }

  private loadCurrentProjectId() {
    this.route.params
      .subscribe(params => this.projectId = params['projectId']);
  }

  private loadCurrentProject() {
    this.projectService.getOne(this.projectId)
      .subscribe(project => this.project = project);
  }

  private mapData(control: AbstractControl): Point {
    let point = control.value as Point;
    point.projectId = this.projectId;
    return point;
  }

}


