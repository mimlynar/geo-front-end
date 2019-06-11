import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Project} from "../../project";
import {MatDialog} from "@angular/material/dialog";
import {ProjectCreationComponent} from "../project-creation/project-creation.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadProjects();
  }


  openDialog(): void {
    var dialogRef = this.dialog.open(ProjectCreationComponent, {
        width: '550px',
        height: '350px'
      })
    ;
    dialogRef.afterClosed().subscribe(success => this.loadProjects())
  }

  delete(project: Project) {
    this.projectService.remove(project)
      .subscribe(() => this.removeProjectFromList(project));
  }

  private removeProjectFromList(project: Project) {
    let index: number = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  private loadProjects() {
    this.projectService.getAll()
      .subscribe(projects => this.projects = projects);
  }
}
