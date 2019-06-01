import {Component, OnInit} from '@angular/core';
import {Point} from "../point";
import {PointService} from "../point.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project} from "../project";

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  points: Point[] = [];
  projectId: number;
  project: Project;

  constructor(
    private pointService: PointService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadCurrentProjectId();
    this.loadProjectPoints();
    this.loadCurrentProject();
  }


  private loadProjectPoints() {
    this.pointService.getPointsForProject(this.projectId).subscribe(points => this.points = points);
  }

  delete(point: Point) {
    this.pointService.delete(point.id)
      .subscribe(() => this.removeTaskFromList(point));
  }

  removeTaskFromList(point: Point) {
    let index: number = this.points.indexOf(point);
    if (index !== -1) {
      this.points.splice(index, 1);
    }
  }

  createNewEntry() {
    let point: Point = new Point();
    this.points.push(point);
  }

  goToProject() {
    this.router.navigate(["projects", this.projectId]);
  }


  private loadCurrentProjectId() {
    this.route.params.subscribe(params => this.projectId = params['projectId']);
  }

  private loadCurrentProject() {
    this.projectService.getOne(this.projectId).subscribe(project => this.project = project);
  }
}


