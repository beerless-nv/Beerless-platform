import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoadingService} from '../_services/loading.service';
import {ErrorService} from '../_services/error.service';
import {AuthService} from '../_services/authorization/auth.service';

@Injectable()
export class MyHttpClientInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService, private errorService: ErrorService, private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setParams: {
                access_token: this.authService.getToken(),
            },
        });

        console.log(request);
        this.loadingService.startLoading();

        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => {

                    if (event.type !== 0) {
                        this.loadingService.finishLoading();
                        this.loadingService.noError();
                    }

                },
                    (err: any) => {

                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 400) {
                            this.errorService.handleErrorMsg(err.error['msg']);
                        } else {
                            this.loadingService.hasError();
                        }

                        this.loadingService.finishLoading();
                    }

        }));
    }
}
