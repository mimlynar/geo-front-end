import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {MessageService} from "./message.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(
    private messageService: MessageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string = error.error;
          this.messageService.emitMessage(errorMessage);
          return throwError(errorMessage);
        })
      )
  }

}
