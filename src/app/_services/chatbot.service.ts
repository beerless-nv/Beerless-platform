import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Guid} from "guid-typescript";
import {map} from "rxjs/operators";

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

    intervalId: number;

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }


    sendMessage(message) {
        if (message !== '') {
            if (message !== 'start_conversation') {
                this.messagesArray.push({type: 'user', messages: [{message: message}], timestamp: Date.now()});
                this.messages.next(this.messagesArray);
            }

            this.http.post(this.apiUrl + '/chats/' + this.chatbotId + '/message?access_token=' + this.accessToken, {
                'message': message,
                'environment': 'production',
                'session': this.session,
                'locale': 'en'
            }, {headers: this.headers}).toPromise().then(data => console.log(data));
        }
    }

    openChatStream(date, stop) {
        if (stop === true) {
            console.log(this.intervalId);
            clearInterval(this.intervalId);
        } else {
            this.intervalId = setInterval(() => {

                // http call to oswald api
                this.http.get(this.apiUrl + '/chats/' + this.chatbotId + '/session/' + this.session + '/latest/' + date, {headers: this.headers})
                    .toPromise()
                    .then(async data => {
                        console.log(data[0]);
                        if (data[0]) {
                            date = await this.processData(data[0]);
                        }
                    });
            }, 1000);
            console.log(this.intervalId);
        }

    }

    closeChatStream() {

        // set current datetime
        const date = new Date(Date.now());

        console.log('ok');

        // clear interval
        console.log();
        this.openChatStream(date, true);
        // clearInterval();
    }

    processData(data) {
        const messages = [];
        const quickReplies = [];

        // loading messages
        for (let i = 0; i < data['data'].length; i++) {
            messages.push({message: data['data'][i]['message']});
        }

        // loading quick replies
        if (data['quickReplies']) {
            for (let i = 0; i < data['quickReplies'].length; i++) {
                quickReplies.push({text: data['quickReplies'][i]['text'], action: data['quickReplies'][i]['action']});
            }
        }

        // put messagesArray in behaviorsubject
        this.messagesArray.push({
            type: 'chatbot',
            messages: messages,
            quickReplies: quickReplies,
            timestamp: data['createdAt']
        });
        this.messages.next(this.messagesArray);

        return data['createdAt'];
    }

    getChat() {

    }

    getSession() {
        return this.session;
    }


    setSession() {
        const sessionId = sessionStorage.getItem('chatbotSession');

        // set up new sessionId if it doesn't exist
        if (sessionId !== null) {
            this.session = sessionId;
        } else {
            this.newSession();
        }

        // open stream
        this.openChatStream(new Date(Date.now()), false);
    }

    newSession() {
        // clear messages when new session
        this.messagesArray = [];
        this.messages.next(null);

        // set new session
        const timestampExpire = (Date.now() + (3600000 * 24));
        this.session = Guid.create();
        sessionStorage.setItem('chatbotSession', JSON.stringify({
            sessionId: this.session,
            timestampExpire: new Date(timestampExpire)
        }));

        // wake up chatbot
        this.sendMessage('start_conversation');
    }
}
