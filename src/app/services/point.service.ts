import {Injectable} from '@angular/core';
import {Point} from "../point";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";


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

  save(points: Point[]): Observable<Point[]> {
    return this.http.post<Point[]>(this.endPoint, points);
  }

  delete(pointId: number): Observable<Point> {
    let endPoint = this.endPoint + pointId;
    return this.http.delete<Point>(endPoint, httpOptions);
  }

  getPointsForProject(projectId: number): Observable<Point[]> {
    let endPoint = this.endPoint + "project/" + projectId;
    return this.http.get<Point[]>(endPoint);
  }

  getPointsByNameAndProject(pointName: string, projectId: number): Observable<Point[]> {
    if (!pointName.trim()) {
      return of([]);
    }

    let endPoint = this.endPoint + pointName + "/" + projectId;
    return this.http.get<Point[]>(endPoint)
      .pipe(source => source);
  }

}
