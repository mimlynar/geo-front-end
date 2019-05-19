import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolarTaskService {

  private taskUrl = 'http://localhost:9999/polar';


  constructor() { }
}
