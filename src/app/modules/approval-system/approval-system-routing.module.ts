import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApprovalSystemIndexComponent} from './pages/approval-system-index/approval-system-index.component';

const routes: Routes = [
    {path: '', component: ApprovalSystemIndexComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApprovalSystemRoutingModule {
}
