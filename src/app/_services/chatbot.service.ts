import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Guid} from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    readonly apiUrl = 'https://api.oswald.ai/api/v1';
    readonly chatbotId = '5c909b61ccc52e00050a6e76';
    readonly accessToken = 'A4oA1hOSefxeOveUe49pBajyykPMhn6vFfnLG9geu4LKTGXUoDaHME9sSN4Tr0gT';
    session = null;
    messages = new BehaviorSubject<Array<any>>(null);
    messagesArray = [];

    intervalId: number;

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(private http: HttpClient) {
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
            }, {headers: this.headers}).toPromise();
        }
    }

    openChatStream(date, stop) {
        if (stop === true) {
            clearInterval(this.intervalId);
        } else {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => {
                // http call to oswald api
                this.http.get(this.apiUrl + '/chats/' + this.chatbotId + '/session/' + this.session + '/latest/' + date, {headers: this.headers})
                    .toPromise()
                    .then(async data => {
                        if (data[0]) {
                            date = await this.processData(data[0]);
                        }
                    });
            }, 1000);
        }

    }

    closeChatStream() {

        // set current datetime
        const date = new Date(Date.now());

        // clear interval
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


    async setSession() {
        const sessionId = await sessionStorage.getItem('chatbotSession');

        // set up new sessionId if it doesn't exist
        if (sessionId !== null) {
            this.session = sessionId;

            // open stream
            this.openChatStream(new Date(Date.now()).toISOString(), false);
        } else {
            this.newSession();

            const date = new Date(Date.now());
            date.setSeconds(date.getSeconds() - 10);

            // open stream
            this.openChatStream(date.toISOString(), false);
        }



    }

    newSession() {
        // clear messages when new session
        this.messagesArray = [];
        this.messages.next(null);

        // set new session
        const sessionId = Guid.create();
        this.session = sessionId['value'];
        sessionStorage.setItem('chatbotSession', this.session);

        // wake up chatbot
        this.sendMessage('start_conversation');
    }
}
