import {Component, OnInit} from '@angular/core';
import {LayoutsService} from '../../layouts.service';

@Component({
    selector: 'app-blank-layout',
    templateUrl: './blank-layout.component.html',
    styles: []
})
export class BlankLayoutComponent implements OnInit {

    constructor(private layoutsService: LayoutsService) {
    }

    ngOnInit() {
        this.layoutsService.layout$.next('blank');
    }

}
