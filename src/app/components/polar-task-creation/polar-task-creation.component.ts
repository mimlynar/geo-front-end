import {Component, Inject} from '@angular/core';
import {PolarTask} from "../../polarTask";
import {PolarService} from "../../services/polar.service";
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

  closeModal(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.prepareNewPolarTask();
    this.taskService.save(this.task)
      .subscribe(task => {
        this.closeModal()
      });
  }

  private prepareNewPolarTask() {
    this.task.projectId = this.data.projectId;
    this.task.observations = [];
    let standPoint = new Point();
    this.task.observations.forEach(o=>o.target=standPoint);
  }

}
