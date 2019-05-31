import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'beerless-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {

    // value
    @Input('value') val: string;

    // required attributes
    @Input() id: string;
    @Input() label: string;
    @Input() formControl: any;

    // optional attributes
    @Input() placeholder: string;
    @Input() required = false;
    @Input() rows = 2;
    @Input() class = null;
    @Input() characterCounter = false;

    // required if characterCounter is true
    @Input() maxCharacters: number;

    // error messages
    @Input() errorTypes: Array<string>;
    @Input() errorMessages: Array<string>;


    @ViewChild('errorTooltip') errorTooltip;
    hideTooltip = false;


    // Both onChange and onTouched are functions
    onChange: any = () => { };
    onTouched: any = () => { };


    constructor() {
    }

    /**
     * Check if required attributes are filled in.
     */
    ngOnInit() {
        if (!this.id) {
            throw new TypeError('\'Id\' is required');
        }
        if (!this.label) {
            throw new TypeError('\'Label\' is required');
        }
        if (!this.formControl) {
            throw new TypeError('\'FormControl\' is required');
        }
        if (this.characterCounter) {
            if (!this.maxCharacters) {
                throw new TypeError('\'maxCharacters\' is required');
            }
        }

        // use label as placeholder if placeholder is empty
        if (!this.placeholder) {
            this.placeholder = this.label;
        }
    }

    get value() {
        return this.val;
    }

    set value(val) {
        this.val = val;
        this.onChange(val);
        this.onTouched();

        if (this.formControl.valid) {
            this.errorTooltip.close();
        }
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
