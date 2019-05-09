import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorsHandler} from './error-handler';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        {
            provide: ErrorHandler,
            useClass: ErrorsHandler
        }
    ]
})
export class ErrorHandlerModule {
}
