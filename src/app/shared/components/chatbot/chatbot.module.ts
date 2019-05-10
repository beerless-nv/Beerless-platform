import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../../pipes/pipes.module';
import {BreweryprofileComponent} from '../../platform-components/breweryprofile/breweryprofile/breweryprofile.component';
import {ChatbotService} from './chatbot.service';
import {ChatbotComponent} from './chatbot/chatbot.component';
import {EmoticonsComponent} from './chatbot/extra/emoticons/emoticons.component';
import {UploadComponent} from './chatbot/extra/upload/upload.component';
import {MessageComponent} from './chatbot/message/message.component';
import {MessagesComponent} from './chatbot/messages/messages.component';
import {ExtraComponent} from './chatbot/extra/extra.component';
import {FileDropModule} from 'ngx-file-drop';
import {NgBootstrapModule} from '../../modules/ng-bootstrap.module';
import {NgxBootstrapModule} from '../../modules/ngx-bootstrap.module';
import {DragScrollModule} from 'ngx-drag-scroll/lib';
import {AppRoutingModule} from '../../../app-routing.module';
import {TextTruncateModule} from '../text-truncate/text-truncate.module';
import {BeerprofileComponent} from '../../platform-components/beerprofile/beerprofile/beerprofile.component';

@NgModule({
    imports: [
        CommonModule,
        FileDropModule,
        NgBootstrapModule,
        NgxBootstrapModule,
        AppRoutingModule,
        DragScrollModule,
        TextTruncateModule,
        PipesModule
    ],
    declarations: [
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
    providers: [
        ChatbotService
    ],
    entryComponents: [
        BeerprofileComponent,
        BreweryprofileComponent
    ]
})
export class ChatbotModule {
}
