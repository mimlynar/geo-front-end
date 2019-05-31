import {Component, OnInit} from '@angular/core';
import {Point} from "../point";
import {PointService} from "../point.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  points: Point[] = [];
  projectId: number;

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
  }


  private loadProjectPoints() {
    this.pointService.getPointsForProject(this.projectId).subscribe(points => this.points = points);
  }

  delete(point: Point) {
    this.pointService.delete(point);
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

}


