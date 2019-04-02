import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Guid} from "guid-typescript";

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    readonly apiUrl = 'https://api.oswald.ai/api/v1';
    readonly chatbotId = '5c909b61ccc52e00050a6e76';
    readonly accessToken = 'A4oA1hOSefxeOveUe49pBajyykPMhn6vFfnLG9geu4LKTGXUoDaHME9sSN4Tr0gT';
    session;
    messages = new BehaviorSubject<Array<any>>(null);
    messagesArray = [];

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }



    sendMessage(message) {

        if (message !== '') {
            if (message !== 'start_conversation') {
                this.messagesArray.push({'type': 'user', 'messages': [{'message': message}]});
            }

            this.http.post(this.apiUrl + '/chats/' + this.chatbotId + '/message?access_token=' + this.accessToken, {
                'message': message,
                'environment': 'production',
                'session': this.session,
                'locale': 'en'
            }, {headers: this.headers})
                .toPromise()
                .then(data => {
                    this.getMessage(data);
                });
        }
    }

    getMessage(data) {
        const messageItemArray = [];

        for (let i = 0; i < data['data'].length; i++) {
            messageItemArray.push({'message': data['data'][i].message});
        }

        this.messagesArray.push({type: 'chatbot', messages: messageItemArray});
        this.messages.next(this.messagesArray);
    }

    getChat() {

    }

    getSession() {
        return this.session;
    }


    setSession() {
        const sessionId = this.cookieService.get('chatbotSession');

        if (sessionId !== '') {
            this.session = sessionId;
        } else {
            this.newSession();
        }
    }

    newSession() {
        // clear messages when new session
        this.messagesArray = [];
        this.messages.next(null);

        // set new session
        const timestampExpire = (Date.now() + (3600000 * 24));
        this.session = Guid.create();
        this.cookieService.set('chatbotSession', this.session, new Date(timestampExpire));

        // wake up chatbot
        this.sendMessage('start_conversation');
    }
}
