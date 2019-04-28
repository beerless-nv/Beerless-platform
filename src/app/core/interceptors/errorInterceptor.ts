import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorInterceptorService} from './errorInterceptor.service';
import {ErrorService} from '../../shared/components/error/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService, private errorInterceptorService: ErrorInterceptorService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => {
                        if (event.type !== 0) {
                            this.errorInterceptorService.error$.next(false);
                        }
                    }
                ), catchError((err) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 422) {
                                this.errorService.handleErrorMsg(err.error.error.details.messages);
                            } else {
                                this.errorInterceptorService.error$.next(true);
                            }
                        }

                        return throwError(err.statusText);
                    }
                ));
    }
}
