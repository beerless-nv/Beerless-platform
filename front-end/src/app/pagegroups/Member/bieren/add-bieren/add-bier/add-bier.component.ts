import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BrouwerijenService} from '../../../../../services/brouwerijen.service';
import {filter, share} from 'rxjs/operators';

@Component({
    selector: 'app-add-bier',
    templateUrl: './add-bier.component.html',
    styles: []
})
export class AddBierComponent implements OnInit {

    brouwerijenList$: Observable<any>;
    brouwerijenByNaamList$: Observable<any>;
    dateToday = new Date();

    constructor(private brouwerijenService: BrouwerijenService) {
    }

    ngOnInit() {
        this.getAllBrouwerijen();
    }

    getAllBrouwerijen() {
        this.brouwerijenService.getAllBrouwerijen().subscribe(val => this.brouwerijenList$ = val);
    }

    getBrouwerijenByNaam(naam) {
        this.brouwerijenByNaamList$ = this.brouwerijenList.map(
            filter(n => n === naam),
            share()
        );
        console.log(this.brouwerijenByNaamList$);
    }
}
