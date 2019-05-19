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

  points: Point[] = [
    {number: '10', x: 12, y: 3, id: 1}
  ];

  project: Project;

  constructor(
    private pointService: PointService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router

  ) {
  }

  ngOnInit() {
    this.loadCurrentProject();
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

  goBack() {
    this.router.navigateByUrl("projects/" + this.getCurrentProjectId());
  }

  private getCurrentProjectId(): number {
    let idFromUrl = this.route.snapshot.paramMap.get('projectId');
    return idFromUrl !== null ? +idFromUrl : null;
  }

  private loadCurrentProject() {
    let projectId = this.getCurrentProjectId();
    this.projectService.getOne(projectId).subscribe(project => this.project = project);

  }


}
