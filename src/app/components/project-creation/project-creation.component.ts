import {Component} from '@angular/core';
import {Project} from "../../project";
import {ProjectService} from "../../services/project.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-project',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent {

  project: Project = new Project();

  constructor(
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<ProjectCreationComponent>,
  ) {
  }

  createProject(): void {
    this.projectService.save(this.project)
      .subscribe(success => this.closeDialog());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
