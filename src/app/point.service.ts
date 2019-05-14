import { Injectable } from '@angular/core';
import {Point} from "./point";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor() { }

  delete(point: Point) {
    log("point deleted");
  }
}
