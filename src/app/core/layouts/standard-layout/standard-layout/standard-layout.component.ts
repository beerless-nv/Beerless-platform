import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutsService} from '../../layouts.service';

@Component({
    selector: 'app-standard-layout',
    templateUrl: './standard-layout.component.html',
    styles: []
})
export class StandardLayoutComponent implements OnInit, OnDestroy {

    constructor(private layoutsService: LayoutsService) {
    }

    ngOnInit() {
        this.layoutsService.layout$.next('standard');
    }

    ngOnDestroy(): void {
    }

}
