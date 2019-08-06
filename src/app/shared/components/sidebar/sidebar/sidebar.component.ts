import {Component, Input, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar.service';

@Component({
    selector: 'beerless-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Input() isOpen;

    constructor(private sidebarService: SidebarService) {
    }

    ngOnInit() {
        this.sidebarService.isOpen$.subscribe(isOpen =>
            this.isOpen = isOpen
        );
    }

}
