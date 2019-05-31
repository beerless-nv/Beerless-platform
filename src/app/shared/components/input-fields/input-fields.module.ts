import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InputComponent} from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';

@NgModule({
    imports: [
        CommonModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        FormsModule,
        NgbPopoverModule
    ],
    declarations: [
        InputComponent,
        TextareaComponent,
        RangeSliderComponent
    ],
    exports: [
        InputComponent,
        TextareaComponent,
        RangeSliderComponent
    ]
})
export class InputFieldsModule {
}
