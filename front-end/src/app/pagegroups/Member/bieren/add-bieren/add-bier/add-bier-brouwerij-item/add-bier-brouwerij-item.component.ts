import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-add-bier-brouwerij-item',
    templateUrl: './add-bier-brouwerij-item.component.html',
    styles: []
})
export class AddBierBrouwerijItemComponent implements OnInit {

    @Input() item: any;
    @Input() index: number;

    brouwerijNaam = '';

    constructor() {
    }

    ngOnInit() {
    }

    addBrouwerij(naam) {
        this.brouwerijNaam = naam;
    }
}
