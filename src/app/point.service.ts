import {Injectable} from '@angular/core';
import {Point} from "./point";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private endPoint = 'http://localhost:9999/points/';

  constructor(
    private http: HttpClient
  ) {
  }

  delete(pointId: number): Observable<Point> {
    let endPoint = this.endPoint + pointId;
    return this.http.delete<Point>(endPoint, httpOptions);
  }

  getPointsForProject(projectId: number): Observable<Point[]> {
    let endPoint = this.endPoint + "project/" + projectId;
    return this.http.get<Point[]>(endPoint);
  }
}
