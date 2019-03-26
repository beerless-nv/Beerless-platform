import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-add-beer-brewery-item',
    templateUrl: './add-beer-brewery-item.component.html',
    styles: []
})
export class AddBeerBreweryItemComponent implements OnInit {

    @Input() item: any;
    @Input() index: number;
    @Output() searchBrewery = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    addBrewery(brewery) {
        this.searchBrewery.emit(brewery);
    }
}
