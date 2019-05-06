import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../pipes/pipes.module';
import {SassHelperModule} from '../../providers/sass-helper/sass-helper.module';
import {LinkButtonComponent} from './link-button/link-button.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        SassHelperModule
    ],
    declarations: [
        LinkButtonComponent,
    ],
    exports: [
        LinkButtonComponent
    ]
})
export class ButtonsModule {
}
