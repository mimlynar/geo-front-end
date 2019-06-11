import {Component, Inject} from '@angular/core';
import {PolarTask} from "../../polarTask";
import {PolarService} from "../../polar.service";
import {Point} from "../../point";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  projectId: number;
  projectName: string;
}

@Component({
  selector: 'app-new-task',
  templateUrl: './polar-task-creation.component.html',
  styleUrls: ['./polar-task-creation.component.css']
})
export class PolarTaskCreationComponent {

  task: PolarTask = new PolarTask();

  constructor(
    private taskService: PolarService,
    private dialogRef: MatDialogRef<PolarTaskCreationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.prepareNewPolarTask();
    this.taskService.save(this.task)
      .subscribe(task => {
        this.onNoClick()
      });
  }

  private prepareNewPolarTask() {
    this.task.projectId = this.data.projectId;
    this.task.observations = [];
    let standPoint = new Point();
    this.task.observations.forEach(o=>o.target=standPoint);
  }

}
