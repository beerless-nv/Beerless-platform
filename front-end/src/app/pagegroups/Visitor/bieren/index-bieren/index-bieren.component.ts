import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BierenService} from '../../../../services/bieren.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-index-bieren',
  templateUrl: './index-bieren.component.html',
  styleUrls: []
})
export class IndexBierenComponent implements OnInit {

    bierenList$: Observable<any>;
    bierenListJSON;
    dateToday = new Date();
    bierNaam = '';
    bierNaamOud = '';
    page;

    constructor(private bierenService: BierenService, private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(queryParam => {
            this.bierNaam = queryParam.get('name');
            this.page = queryParam.get('page');
        });
        this.cdRef.detectChanges();

        if (this.bierNaam !== null) {
            this.bierenList$ = of(JSON.parse(localStorage.getItem('BierSearchArray')));
        } else {
            localStorage.removeItem('BierSearchArray');
        }
    }

    getBierenByNaam(naam) {
        this.bierNaamOud = this.bierNaam;
        this.bierNaam = naam;

        if (naam !== '') {
            if (this.bierNaam !== this.bierNaamOud) {
                this.getPage(1);
                this.bierenList$ = this.bierenService.getBierenByNaam(this.bierNaam);
                // save to localStorage
                this.bierenList$.subscribe(val => localStorage.setItem('BierSearchArray', JSON.stringify(val)));
            } else {
                this.getPage(this.page);
            }
        } else {
            localStorage.removeItem('BierSearchArray');
            this.bierenList$ = of(JSON.parse(localStorage.getItem('BierSearchArray')));
        }
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
