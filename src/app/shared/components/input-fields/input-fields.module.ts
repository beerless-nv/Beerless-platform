import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InputComponent} from './input/input.component';

@NgModule({
    imports: [
        CommonModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        FormsModule,
        NgbPopoverModule
    ],
    declarations: [
        InputComponent
    ],
    exports: [
        InputComponent
    ]
})
export class InputFieldsModule {
}