import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-new-project',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {

  project: Project;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.initializeProject();
  }

  createProject(): void {
    this.projectService.save(this.project);
    this.router.navigateByUrl("");
  }

  close(): void {
    this.location.back();
  }

  private initializeProject(): void {
    this.project = new Project();
    this.project.polarTasks = [];
  }

}
