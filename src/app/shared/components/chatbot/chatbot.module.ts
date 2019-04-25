import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatbotComponent} from './chatbot/chatbot.component';
import {EmoticonsComponent} from './chatbot/extra/emoticons/emoticons.component';
import {UploadComponent} from './chatbot/extra/upload/upload.component';
import {MessageComponent} from './chatbot/message/message.component';
import {MessagesComponent} from './chatbot/messages/messages.component';
import {ExtraComponent} from './chatbot/extra/extra.component';
import {FileDropModule} from 'ngx-file-drop';
import {SafeHTMLPipe} from '../../pipes/safeHTML.pipe';
import {NgBootstrapModule} from '../../modules/ng-bootstrap.module';
import {NgxBootstrapModule} from '../../modules/ngx-bootstrap.module';
import {SafeURLPipe} from '../../pipes/safeURL.pipe';
import {DragScrollModule} from 'ngx-drag-scroll/lib';
import {AppRoutingModule} from '../../../app-routing.module';
import {TextTruncateModule} from '../text-truncate/text-truncate.module';
import {BeerprofileComponent} from '../../../modules/beer/components/beerprofile/beerprofile.component';

@NgModule({
    imports: [
        CommonModule,
        FileDropModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        AppRoutingModule,
        DragScrollModule,
        TextTruncateModule
    ],
    declarations: [
        SafeHTMLPipe,
        SafeURLPipe,
        ChatbotComponent,
        EmoticonsComponent,
        UploadComponent,
        MessageComponent,
        MessagesComponent,
        ExtraComponent,
    ],
    exports: [
        ChatbotComponent
    ],
    entryComponents: [
        BeerprofileComponent
    ]
})
export class ChatbotModule {
}
