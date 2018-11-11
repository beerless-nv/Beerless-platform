import { Component, OnInit } from '@angular/core';
import {BierenService} from '../../../../services/bieren.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-index-bieren',
  templateUrl: './index-bieren.component.html',
  styleUrls: []
})
export class IndexBierenComponent implements OnInit {

    bierenList$: Observable<any>;
    dateToday = new Date();
    bierNaam = '';
    bierNaamOud = '';
    page;

    constructor(private bierenService: BierenService, private router: Router, private route: ActivatedRoute) {    }

    ngOnInit() {
        // this.getBierenByNaam('');

        this.route.queryParamMap.subscribe(queryParam => {
            this.bierNaam = queryParam.get('name');
            this.page = queryParam.get('page');
        });

        if (this.bierNaam !== '') {
            this.getBierenByNaam(this.bierNaam);
        }
    }

    getBierenByNaam(naam) {
        this.bierNaamOud = this.bierNaam;
        this.bierNaam = naam;

        if (naam !== '') {
            if (this.bierNaam !== this.bierNaamOud) {
                this.getPage(1);
            } else {
                this.getPage(this.page);
            }
        } else {
            this.getPage(0);
        }

        this.bierenList$ = this.bierenService.getBierenByNaam(this.bierNaam);
    }

    getPage(page) {
        this.page = page;
        this.routeChange();
    }

    routeChange() {
        if (this.page === 0) {
            this.router.navigate(['/beers'], {queryParams: {name: this.bierNaam}});
        } else {
            this.router.navigate(['/beers'], {queryParams: {name: this.bierNaam, page: this.page}});
        }
    }
}
