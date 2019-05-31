import {Injectable} from '@angular/core';
import {Point} from "./point";
import {log} from "util";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PolarTask} from "./polarTask";

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private endPoint = 'http://localhost:9999/points';

  constructor(
    private http: HttpClient
  ) {
  }

  delete(point: Point) {
    log("point deleted");
  }

  getPointsForProject(projectId: number): Observable<Point[]> {
    let endPoint = this.endPoint + "/" + projectId;
    return this.http.get<Point[]>(endPoint);
  }
}
