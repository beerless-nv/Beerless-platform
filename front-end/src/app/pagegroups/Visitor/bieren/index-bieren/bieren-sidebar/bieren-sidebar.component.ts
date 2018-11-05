import {Component, Input, OnInit} from '@angular/core';
import {BierenService} from '../../../../../services/bieren.service';


@Component({
    selector: 'app-bieren-sidebar',
    templateUrl: './bieren-sidebar.component.html',
    styleUrls: []
})
export class BierenSidebarComponent implements OnInit {

    @Input() item: { name: string, brewery: string, style: string, image: string };
    @Input() index: number;

    constructor(private bierenService: BierenService) {
    }

    ngOnInit() {
    }

}
