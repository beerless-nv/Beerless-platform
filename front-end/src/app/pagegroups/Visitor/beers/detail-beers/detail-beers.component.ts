import {Component, OnInit} from '@angular/core';
import {BeersService} from '../../../../services/beers.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {finalize, share} from 'rxjs/operators';

@Component({
    selector: 'app-detail-beers',
    templateUrl: './detail-beers.component.html',
    styles: []
})
export class DetailBeersComponent implements OnInit {
    loading = false;
    environment = environment;
    beerId;
    beer$: Observable<any>;
    urlBeerImage;

    constructor(private beersService: BeersService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.beerId = params.get('id');
        });

        this.getBeerById();
    }

    getBeerById() {
        this.loading = true;
        this.beer$ = this.beersService.getBeerById(this.beerId)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                share()
            );
        // this.beersService.getBeerById(this.beerId).subscribe(val => this.beer$ = val);
    }
}
