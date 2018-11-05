import { Component, OnInit } from '@angular/core';
import {BierenService} from '../../../../services/bieren.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-index-bieren',
  templateUrl: './index-bieren.component.html',
  styleUrls: []
})
export class IndexBierenComponent implements OnInit {

    bierenList$: Observable<any>;

    constructor(private bierenService: BierenService) {    }

    ngOnInit() {
    }

    getBieren(naam) {
        this.bierenList$ = this.bierenService.getBieren(naam);
            // .pipe(
            //     finalize(() => {
            //         this.loading = false;
            //     })
            // );
    }
}
