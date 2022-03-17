import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event) => (event instanceof HttpResponse ? "Successful" : ""),
        (err) => {
          this.handleServiceError(err.status, err.error.detail);
        }
      )
    );
  }

  handleServiceError(status: number, message?: string) {
    // You can choose to handle other error statuses here
    console.log("Error Status: ", status);
    switch (status) {
      case 401:
        // this.toast.error("You are unauthorized, please login with your valid credential");
        // this.authService.logout();
        alert('You are unauthorized');
        break;
      case 403:
        alert(message);
        break;
      case 404:
        alert('Not Fount');
        break;
      case 0:
        alert("Network Error, please check your connection and try again");
        break;
      case 503:
        alert("Service Unavailable, please try again later");
        break;
      case 504:
        alert("Something went wrong, please try again");
        break;
      case 500:
        alert('Server Error');
        break;
      default:
        break;
    }
  }
}
