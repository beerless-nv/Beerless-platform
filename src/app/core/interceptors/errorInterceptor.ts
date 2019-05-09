import {ErrorHandler, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {ErrorInterceptorService} from './errorInterceptor.service';
import {ErrorService} from '../../shared/components/error/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService, private errorInterceptorService: ErrorInterceptorService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                tap((event: HttpEvent<any>) => {
                        if (event.type !== 0) {
                            this.errorInterceptorService.error$.next(false);
                        }
                    }
                ), catchError((err) => {
                        console.log(err.error.error);
                        if (err instanceof HttpErrorResponse) {
                            if (!navigator.onLine) {
                                // Handle offline error
                                console.error('Client internet connection down');
                            } else {
                                switch (err.status) {
                                    case 422:
                                        this.errorService.handleErrorMsg(err.error.error.details.messages);
                                        break;
                                    case 404:
                                    case 401:
                                    case 400:
                                        this.errorService.handleDefaultError(err.error.error.message);
                                        break;
                                    default:
                                        this.errorInterceptorService.error$.next(true);
                                        break;
                                }
                            }
                        }

                        return throwError(err.statusText);
                    }
                ));
    }
}
