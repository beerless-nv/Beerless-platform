import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BierItemComponent} from '../../Visitor/bieren/index-bieren/bier-item/bier-item.component';
import {BierenSidebarComponent} from '../../Visitor/bieren/index-bieren/bieren-sidebar/bieren-sidebar.component';
import {RouterModule} from '@angular/router';
import {IndexBierenComponent} from '../../Visitor/bieren/index-bieren/index-bieren.component';
import {AddBierenComponent} from './add-bieren/add-bieren.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgBootstrapModule} from '../../../sharedModules/ng-bootstrap.module';
import {NgxBootstrapModule} from '../../../sharedModules/ngx-bootstrap.module';
import {AddBierComponent} from './add-bieren/add-bier/add-bier.component';
import { AddBierBrouwerijItemComponent } from '../../Member/bieren/add-bieren/add-bier/add-bier-brouwerij-item/add-bier-brouwerij-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        NgBootstrapModule,
        NgxBootstrapModule
    ],
    declarations: [BierItemComponent, BierenSidebarComponent, IndexBierenComponent, AddBierenComponent, AddBierComponent, AddBierBrouwerijItemComponent]
})
export class BierenModule {
}
