import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService) {
  }

  ngOnInit() {
    let id = this.getCurrentProjectId();
    this.projectService.getProject(id).subscribe(project => this.project = project);
  }

  private getCurrentProjectId(): number {
    let idFromUrl = this.route.snapshot.paramMap.get('projectId');
    return idFromUrl !== null ? +idFromUrl : null;
  }

}
