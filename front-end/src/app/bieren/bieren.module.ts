import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BierenComponent } from './bieren.component';
import { BierItemComponent } from './bier-item/bier-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BierenComponent, BierItemComponent]
})
export class BierenModule { }
