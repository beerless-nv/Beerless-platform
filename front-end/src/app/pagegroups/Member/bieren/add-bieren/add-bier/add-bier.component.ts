import {Component, OnInit, ViewChild, ViewChildren, AfterViewInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BrouwerijenService} from '../../../../../services/brouwerijen.service';
import { AddBierBrouwerijItemComponent } from './add-bier-brouwerij-item/add-bier-brouwerij-item.component';

@Component({
    selector: 'app-add-bier',
    templateUrl: './add-bier.component.html',
    styles: []
})
export class AddBierComponent implements OnInit, AfterViewInit {

    brouwerijenList: string[] = [];
    brouwerijenByNaamList: string[] = [];
    brouwerijenByNaamList$: Observable<any>;
    dateToday = new Date();
    openBrouwerijItems = false;
    brouwerijNaam = '';

    @ViewChildren(AddBierBrouwerijItemComponent) addBierBrouwerijItem: AddBierBrouwerijItemComponent;

    constructor(private brouwerijenService: BrouwerijenService) {
    }

    ngOnInit() {
        this.getAllBrouwerijen();
    }

    ngAfterViewInit() {
        this.brouwerijNaam = this.addBierBrouwerijItem.brouwerijNaam;
        console.log(this.brouwerijNaam);
    }

    getAllBrouwerijen() {
        this.brouwerijenService.getAllBrouwerijen().subscribe(val => this.brouwerijenList = val);
    }

    getBrouwerijenByNaam(naam) {
        if (naam !== '') {
            this.openBrouwerijItems = true;
            this.brouwerijenByNaamList = [];
            // console.log(naam);

            for (const x in this.brouwerijenList) {
                // console.log(this.brouwerijenList[x]['naam']);
                if ((this.brouwerijenList[x]['naam'].toLowerCase()).match(naam.toLowerCase())) {
                    this.brouwerijenByNaamList.push(this.brouwerijenList[x]);
                    // console.log(this.brouwerijenList[x]['naam']);
                }
            }
        } else {
            this.brouwerijenByNaamList = [];
            this.openBrouwerijItems = false;
        }
        this.brouwerijenByNaamList$ = of(this.brouwerijenByNaamList);
        // console.log(this.brouwerijenByNaamList$);
    }
}
