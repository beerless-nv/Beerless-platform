import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Guid} from 'guid-typescript';
import {Emojis} from '../../../assets/emojis/emojis.js';

declare var emojis: any;

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    readonly apiUrl = 'https://api.oswald.ai/api/v1';
    readonly chatbotId = '5c909b61ccc52e00050a6e76';
    readonly accessToken = 'A4oA1hOSefxeOveUe49pBajyykPMhn6vFfnLG9geu4LKTGXUoDaHME9sSN4Tr0gT';
    session = null;
    isSessionData = true;
    isNewSession = false;
    messages = new BehaviorSubject<Array<any>>(null);
    messagesArray = [];
    takeoverSession = false;
    chatStartDate;

    polling = false;

    chatTimestamp;

    intervalId;

    emojis;

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(private http: HttpClient) {
        this.emojis = emojis;
    }

    /**
     * Send user messages to the chatbot API.
     *
     * Also used for the start_conversation trigger message
     *
     * @param message (message user has typed)
     */
    sendMessage(message) {
        if (message !== '') {
            this.http.post(this.apiUrl + '/chats/' + this.chatbotId + '/message?access_token=' + this.accessToken, {
                'message': message,
                'environment': 'production',
                'session': this.session,
                'locale': 'en',
                'metadata': {
                    'firstName': 'Tom',
                    'lastName': 'Nuyts',
                    'access_token': 'y8lIyPJ4aRyeK4xQc7iZOlu3B1Cday5EI3Ia1I8kBo4FykcdRGhji4VEE1Im21ia'
                }
            }, {headers: this.headers}).toPromise();
        }
    }

    /**
     * Get response message from api
     *
     * @param date (date of when you want to retrieve the response message)
     */
    getMessages(date) {
        console.log('test2');
        const params = new HttpParams()
            .set('types', 'in,out,takeover');

        // http call to oswald api
        return this.http.get(this.apiUrl + '/chats/' + this.chatbotId + '/session/' + this.session + '/latest/' + date, {
            headers: this.headers,
            params: params
        });
    }

    /**
     * Set up a chat stream to retrieve messages that are send by the user and bot.
     *
     * @param dateTime (date of when you want to retrieve messages)
     * @param stop (true = start chat stream, false = stop chat stream)
     */
    openChatStream(dateTime) {
        if (this.polling === false) {
            this.polling = true;
            this.chatStream(dateTime);
        }
    }

    chatStream(date) {
        if (this.polling) {
            setTimeout(() => {
                console.log(date);
                this.getMessages(date)
                    .subscribe(async (data) => {
                        const resp = await this.processData(data);

                        if (resp) {
                            this.chatStream(resp);
                        } else {
                            this.chatStream(date);
                        }
                    });
            }, 300);
        }
    }

    /**
     * Stop current chat stream.
     */
    closeChatStream() {
        // set current datetime
        const date = new Date(Date.now());

        // clear interval
        // this.polling = false;
        // this.chatStream(date);
    }

    /**
     * process the data that comes from the data stream.
     *
     * @param response (response of the data stream)
     */
    processData(response): Promise<string> {
        const oldMessagesArray = [];

        return new Promise<string>((resolve, reject) => {
            for (let j = 0; j < response.length; j++) {
                if (response[j]['message'] !== 'start_conversation') {

                    const messages = [];
                    const quickReplies = [];
                    let senderType;

                    // set sender type
                    switch (response[j]['type']) {
                        case 'in':
                            senderType = 'user';
                            break;
                        case 'out':
                            senderType = 'chatbot';
                            break;
                        case 'takeover':
                            senderType = 'takeover';
                            break;
                    }

                    // loading messages
                    if (response[j]['data']) {
                        for (let i = 0; i < response[j]['data'].length; i++) {
                            switch (response[j]['data'][i]['type']) {
                                case 'text':
                                    messages.push({
                                        type: 'text',
                                        message: response[j]['data'][i]['message']
                                    });
                                    break;
                                case 'url':
                                    messages.push({
                                        type: 'url',
                                        message: response[j]['data'][i]['message'],
                                        url: response[j]['data'][i]['url']
                                    });
                                    break;
                                case 'image':
                                    messages.push({
                                        type: 'image',
                                        image: response[j]['data'][i]['image']
                                    });
                                    break;
                                case 'location':
                                    messages.push({
                                        type: 'location',
                                        message: response[j]['data'][i]['message'],
                                        location: response[j]['data'][i]['elements'],
                                    });
                                    break;
                                case 'carrousel':
                                    messages.push({
                                        type: 'elements',
                                        elements: response[j]['data'][i]['elements']
                                    });
                                    break;
                            }
                        }
                    } else {
                        messages.push({type: 'text', message: response[j]['message']});
                    }

                    // loading quick replies
                    if (response[j]['quickReplies']) {
                        for (let i = 0; i < response[j]['quickReplies'].length; i++) {
                            quickReplies.push({
                                text: response[j]['quickReplies'][i]['text'],
                                action: response[j]['quickReplies'][i]['action']
                            });
                        }
                    }

                    // create messages arrays
                    if (this.isSessionData) {
                        oldMessagesArray.push({
                            id: response[j]['id'],
                            type: senderType,
                            messages: messages,
                            quickReplies: quickReplies,
                            oldMessages: this.isSessionData,
                            timestamp: response[j]['createdAt']
                        });
                    } else {
                        this.messagesArray.push({
                            id: response[j]['id'],
                            type: senderType,
                            messages: messages,
                            quickReplies: quickReplies,
                            oldMessages: this.isSessionData,
                            timestamp: response[j]['createdAt']
                        });
                    }

                    if (response[j]['takeover'] === '2REQUESTED' || response[j]['takeover'] === '3SUGGESTED') {
                        this.takeoverSession = true;
                    } else {
                        this.takeoverSession = false;
                    }
                }
            }

            if (oldMessagesArray.length > 0) {
                this.messagesArray = oldMessagesArray.concat(this.messagesArray);
            }

            this.messages.next(this.messagesArray);

            if (response[response.length - 1]) {
                console.log(this.messagesArray.length);
                resolve(response[response.length - 1]['createdAt']);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * Get all the messages of your current session.
     * Is triggered when messagesArray is empty, but the session still exists.
     */
    async getSession(): Promise<boolean> {
        this.isSessionData = true;
        const sessionObject = JSON.parse(sessionStorage.getItem('chatbotSession'));

        return new Promise<boolean>((resolve, reject) => {
            if (sessionObject !== null) {
                this.getMessages(sessionObject.timestamp).subscribe(async (data) => {
                    if (data[0]) {
                        const dataArray = [];

                        for (const message in data) {
                            if (data[message]['createdAt'] < this.chatStartDate) {
                                dataArray.push(data[message]);
                            }
                        }

                        // get date
                        await this.processData(dataArray);

                        this.isSessionData = false;

                        // open stream
                        this.openChatStream(this.messagesArray[this.messagesArray.length - 1]['timestamp']);

                        resolve(true);
                    }
                });
            } else {
                // open stream
                this.openChatStream(new Date(Date.now()).toISOString());
                resolve(true);
            }
        });
    }

    /**
     * Sets the session when opening the chatbot.
     *
     * If a sessionId is detected in sessionStorage, that sessionId is used.
     * If the sessionStorage lacks a sessionId, a new session is created.
     */
    setSession() {
        const sessionObject = JSON.parse(sessionStorage.getItem('chatbotSession'));

        const date = new Date(Date.now());
        date.setSeconds(date.getSeconds() - 5);

        this.chatStartDate = date.toISOString();

        // set up new sessionId if it doesn't exist
        if (sessionObject !== null) {
            // set sessionId
            this.session = sessionObject.sessionId;
        } else {
            // create new session
            this.newSession(this.chatStartDate);
        }

        this.isSessionData = false;


        // open stream
        this.openChatStream(this.chatStartDate);
    }

    /**
     * Make new session when there is no sessionId in sessionStorage.
     *
     * @param date (current date)
     */
    newSession(date) {
        // clear messages when new session
        this.isNewSession = true;
        this.messagesArray = [];
        this.messages.next(null);

        // set new session
        const sessionId = Guid.create();
        this.session = sessionId['value'];
        sessionStorage.setItem('chatbotSession', JSON.stringify({sessionId: this.session, timestamp: date}));

        // wake up chatbot
        this.sendMessage('start_conversation');
    }
}
