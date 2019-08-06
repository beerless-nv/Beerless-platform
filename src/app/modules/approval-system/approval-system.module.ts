import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {InputFieldsModule} from '../../shared/components/input-fields/input-fields.module';

import {ApprovalSystemRoutingModule} from './approval-system-routing.module';
import {ApprovalSystemIndexComponent} from './pages/approval-system-index/approval-system-index.component';
import { ApprovalItemComponent } from './components/approval-item/approval-item.component';
import { ApprovalExampleComponent } from './components/approval-example/approval-example.component';
import { ApprovalExampleItemComponent } from './components/approval-example-item/approval-example-item.component';

@NgModule({
    imports: [
        CommonModule,
        ApprovalSystemRoutingModule,
        NgbTooltipModule,
        ModalModule,
        InputFieldsModule
    ],
    declarations: [
        ApprovalSystemIndexComponent,
        ApprovalItemComponent,
        ApprovalExampleComponent,
        ApprovalExampleItemComponent
    ]
})
export class ApprovalSystemModule {
}
