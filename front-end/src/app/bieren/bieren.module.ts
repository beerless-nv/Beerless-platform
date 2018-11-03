import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BierenComponent } from './bieren.component';
import { BierItemComponent } from './bier-item/bier-item.component';
import { BierenSidebarComponent } from './bieren-sidebar/bieren-sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BierenComponent, BierItemComponent, BierenSidebarComponent]
})
export class BierenModule { }
