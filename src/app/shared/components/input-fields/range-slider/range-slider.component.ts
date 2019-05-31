import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'beerless-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeSliderComponent),
            multi: true
        }
    ]
})
export class RangeSliderComponent implements OnInit, ControlValueAccessor {

    // value
    @Input('value') val: string;

    @Input() name;
    @Input() min;
    @Input() max;
    @Input() step;

    // Both onChange and onTouched are functions
    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {
    }

    ngOnInit() {
    }

    get value() {
        return this.val;
    }

    set value(val) {
        this.val = val;
        this.onChange(val);
        this.onTouched();
    }

    // We implement this method to keep a reference to the onChange
    registerOnChange(fn) {
        this.onChange = fn;
    }

    // We implement this method to keep a reference to the onTouched
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    // This is a basic setter that the forms API is going to use
    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }
}
