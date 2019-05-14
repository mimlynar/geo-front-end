import {Injectable} from '@angular/core';
import {PolarObservation} from "./polarObservation";
import {Observable, of} from "rxjs";
import {POLAR_TASKS} from "./polar-tasks-mock";
import {PolarTask} from "./polarTask";
import {POLAR_TASK} from "./polar-task-mock";

@Injectable({
  providedIn: 'root'
})
export class PolarService {

  constructor() {
  }

  get(id: number): Observable<PolarTask> {
    if (id) {
      return of(POLAR_TASK);
    }
    return of(new PolarTask());
  }

  resolve(observations: PolarObservation[]): Observable<PolarObservation[]> {
    console.log("task resolved");
    return of([]);
  }

  findTasksByProjectId(projectId: number): Observable<PolarTask[]> {
    return of(POLAR_TASKS);
  }

  save(task: PolarTask): Observable<PolarTask> {
    console.log("task saved");
    let polarTask = new PolarTask();
    polarTask.id= 14;
    return of(polarTask);
  }

  remove(taskId: number): void {
    console.log("task removed");
  }
}
