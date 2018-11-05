import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BierItemComponent} from '../../Visitor/bieren/index-bieren/bier-item/bier-item.component';
import {BierenSidebarComponent} from '../../Visitor/bieren/index-bieren/bieren-sidebar/bieren-sidebar.component';
import {RouterModule} from '@angular/router';
import { IndexBierenComponent } from '../../Visitor/bieren/index-bieren/index-bieren.component';
import { AddBierenComponent } from '../../Member/bieren/add-bieren/add-bieren.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule
    ],
    declarations: [BierItemComponent, BierenSidebarComponent, IndexBierenComponent, AddBierenComponent]
})
export class BierenModule {
}
