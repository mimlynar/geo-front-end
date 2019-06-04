import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project} from "../project";
import {PolarTask} from "../polarTask";
import {PolarService} from "../polar.service";
import {MatDialog} from '@angular/material/dialog';
import {PolarTaskCreationComponent} from "../polar-task-creation/polar-task-creation.component";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId: number;
  project: Project;
  polarTasks: PolarTask[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private polarService: PolarService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCurrentProjectId();
    this.loadCurrentProjectAndTasks();
  }

  openDialog(): void {
    var dialogRef = this.dialog.open(PolarTaskCreationComponent, {
        width: '550px',
        height: '350px',
        data: {
          projectId: this.projectId,
          projectName: this.project.name
        }
      })
    ;
    dialogRef.afterClosed().subscribe(success => this.loadCurrentProjectAndTasks())
  }

  delete(task: PolarTask) {
    this.polarService.remove(task.id)
      .subscribe(() => this.removeTaskFromList(task));
  }

  private loadCurrentProjectAndTasks() {
    this.projectService.getOne(this.projectId).subscribe(project => {
      this.project = project;
      this.polarTasks = project.polarTasks;
    });
  }

  private getCurrentProjectId(): void {
    this.route.params.subscribe(parameters => this.projectId = parameters['projectId']);
  }

  private removeTaskFromList(task: PolarTask) {
    let index: number = this.polarTasks.indexOf(task);
    if (index !== -1) {
      this.polarTasks.splice(index, 1);
    }
  }

}

