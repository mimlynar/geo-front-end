import {Injectable} from '@angular/core';
import {PolarObservation} from "../polarObservation";
import {Observable, of} from "rxjs";
import {PolarTask} from "../polarTask";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PolarService {

  private taskUrl = 'http://localhost:9999/polar';

  constructor(
    private http: HttpClient) {
  }

  getOne(taskId: number): Observable<PolarTask> {
    let endPoint = this.taskUrl + "/" + taskId;
    return this.http.get<PolarTask>(endPoint);
  }

  save(task: PolarTask): Observable<PolarTask> {
    return this.http.post<PolarTask>(this.taskUrl, task);
  }

  remove(taskId: number): Observable<PolarTask> {
    let endPoint = this.taskUrl + "/" + taskId;
    return this.http.delete<PolarTask>(endPoint, httpOptions);
  }

  resolve(observations: PolarObservation[]): Observable<PolarObservation[]> {
    let endPoint = this.taskUrl + "/resolve" ;
    return this.http.post<PolarObservation[]>(endPoint, observations);
  }

}
