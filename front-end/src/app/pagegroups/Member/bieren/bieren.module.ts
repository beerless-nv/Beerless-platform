import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {BierenComponent} from './bieren.component';
import {BierItemComponent} from './index-bieren/bier-item/bier-item.component';
import {BierenSidebarComponent} from './index-bieren/bieren-sidebar/bieren-sidebar.component';
import {RouterModule} from '@angular/router';
import { IndexBierenComponent } from './index-bieren/index-bieren.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [BierItemComponent, BierenSidebarComponent, IndexBierenComponent]
})
export class BierenModule {
}
