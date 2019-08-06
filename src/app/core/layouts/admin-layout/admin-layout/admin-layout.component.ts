import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../../../../shared/components/sidebar/sidebar.service';
import {LayoutsService} from '../../layouts.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styles: []
})
export class AdminLayoutComponent implements OnInit {

    isOpen;

    constructor(private layoutsService: LayoutsService, private sidebarService: SidebarService) {
        sidebarService.isOpen$.subscribe(isOpen =>
            this.isOpen = isOpen
        );
    }

    ngOnInit() {
        this.layoutsService.layout$.next('admin');
    }

}
