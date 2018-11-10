import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-add-bier-brouwerij-item',
    templateUrl: './add-bier-brouwerij-item.component.html',
    styles: []
})
export class AddBierBrouwerijItemComponent implements OnInit {

    @Input() item: any;
    @Input() index: number;
    @Output() searchBrouwerij = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    addBrouwerij(naam) {
        this.searchBrouwerij.emit(naam);
    }
}
