import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BrouwerijenService} from '../../../../../services/brouwerijen.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-add-bier',
    templateUrl: './add-bier.component.html',
    styles: []
})
export class AddBierComponent implements OnInit {

    brouwerijenList: string[] = [];
    brouwerijenByNaamList: string[] = [];
    brouwerijenByNaamList$: Observable<any>;
    dateToday = new Date();
    openBrouwerijItems$: Observable<any>;
    brouwerijNaam$: Observable<any>;
    bierNaam = '';

    constructor(private brouwerijenService: BrouwerijenService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getAllBrouwerijen();

        // query parameter ophalen
        this.route.queryParamMap.subscribe(queryParams => {
            this.bierNaam = queryParams.get('name');
        });
    }

    setBrouwerijNaam(brouwerij: string) {
        this.brouwerijNaam$ = of(brouwerij);
    }

    getAllBrouwerijen() {
        this.brouwerijenService.getAllBrouwerijen().subscribe(val => this.brouwerijenList = val);
    }

    getBrouwerijenByNaam(naam) {
        if (naam !== '') {
            this.openBrouwerijItems$ = of(true);
            this.brouwerijenByNaamList = [];

            for (const x in this.brouwerijenList) {
                if ((this.brouwerijenList[x]['naam'].toLowerCase()).match(naam.toLowerCase())) {
                    this.brouwerijenByNaamList.push(this.brouwerijenList[x]);
                }
            }
        } else {
            this.brouwerijenByNaamList = [];
            this.openBrouwerijItems$ = of(false);
        }
        this.brouwerijenByNaamList$ = of(this.brouwerijenByNaamList);
    }

    hideBrouwerijDropdown() {
        setTimeout(() => {
            this.openBrouwerijItems$ = of(false);
        }, 200);
    }

    showBrouwerijDropdown() {
        this.openBrouwerijItems$ = of(true);
    }
}
