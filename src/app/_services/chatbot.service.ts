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

    emojis = {
        '🍺': ':beer:',
        '🍻': ':cheers:',
        '😀': ':D',
        '😁': '',
        '😂': ':\'D',
        '🙂': ':)',
        '😃': '',
        '🤔': ':thinking:',
        '😄': '',
        '😅': ':\')',
        '😆': 'xD',
        '😇': 'O:-)',
        '😈': '>:-)',
        '👿': '',
        '😉': ';)',
        '😊': '',
        '😋': ':q',
        '😌': '',
        '😍': '',
        '😎': 'B)',
        '😏': '',
        '😐': ':|',
        '😑': '-_-',
        '😒': '',
        '😓': '',
        '😔': '',
        '😕': ':/',
        '😖': ':s',
        '😗': '',
        '😘': ';*',
        '😙': ':*',
        '😚': '',
        '😛': ':p',
        '😜': ';p',
        '😝': '',
        '😞': '',
        '😟': '',
        '😠': '',
        '😡': ':boos:',
        '😢': ':\'(',
        '😣': '',
        '😤': '',
        '😥': '',
        '😦': '',
        '😧': '',
        '😨': '',
        '😩': '',
        '😪': '',
        '😫': '',
        '😬': '',
        '😭': '',
        '😮': ':o',
        '😯': '',
        '😰': '',
        '😱': '',
        '😲': '',
        '😳': '',
        '😴': '',
        '😵': '',
        '😶': '',
        '😷': '',
        '😸': '',
        '😹': '',
        '😺': '',
        '😻': '',
        '😼': '',
        '😽': '',
        '😾': '',
        '😿': '',
        '🙀': '',
        '👣': '',
        '👤': '',
        '👥': '',
        '👶': '',
        '👶🏻': '',
        '👶🏼': '',
        '👶🏽': '',
        '👶🏾': '',
        '👶🏿': '',
        '👦': '',
        '👦🏻': '',
        '👦🏼': '',
        '👦🏽': '',
        '👦🏾': '',
        '👦🏿': '',
        '👧': '',
        '👧🏻': '',
        '👧🏼': '',
        '👧🏽': '',
        '👧🏾': '',
        '👧🏿': '',
        '👨': '',
        '👨🏻': '',
        '👨🏼': '',
        '👨🏽': '',
        '👨🏾': '',
        '👨🏿': '',
        '👩': '',
        '👩🏻': '',
        '👩🏼': '',
        '👩🏽': '',
        '👩🏾': '',
        '👩🏿': '',
        '👪': '',
        '👨‍👩‍👧': '',
        '👨‍👩‍👧‍👦': '',
        '👨‍👩‍👦‍👦': '',
        '👨‍👩‍👧‍👧': '',
        '👩‍👩‍👦': '',
        '👩‍👩‍👧': '',
        '👩‍👩‍👧‍👦': '',
        '👩‍👩‍👦‍👦': '',
        '👩‍👩‍👧‍👧': '',
        '👨‍👨‍👦': '',
        '👨‍👨‍👧': '',
        '👨‍👨‍👧‍👦': '',
        '👨‍👨‍👦‍👦': '',
        '👨‍👨‍👧‍👧': '',
        '👫': '',
        '👬': '',
        '👭': '',
        '👯': '',
        '👰': '',
        '👰🏻': '',
        '👰🏼': '',
        '👰🏽': '',
        '👰🏾': '',
        '👰🏿': '',
        '👱': '',
        '👱🏻': '',
        '👱🏼': '',
        '👱🏽': '',
        '👱🏾': '',
        '👱🏿': '',
        '👲': '',
        '👲🏻': '',
        '👲🏼': '',
        '👲🏽': '',
        '👲🏾': '',
        '👲🏿': '',
        '👳': '',
        '👳🏻': '',
        '👳🏼': '',
        '👳🏽': '',
        '👳🏾': '',
        '👳🏿': '',
        '👴': '',
        '👴🏻': '',
        '👴🏼': '',
        '👴🏽': '',
        '👴🏾': '',
        '👴🏿': '',
        '👵': '',
        '👵🏻': '',
        '👵🏼': '',
        '👵🏽': '',
        '👵🏾': '',
        '👵🏿': '',
        '👮': '',
        '👮🏻': '',
        '👮🏼': '',
        '👮🏽': '',
        '👮🏾': '',
        '👮🏿': '',
        '👷': '',
        '👷🏻': '',
        '👷🏼': '',
        '👷🏽': '',
        '👷🏾': '',
        '👷🏿': '',
        '👸': '',
        '👸🏻': '',
        '👸🏼': '',
        '👸🏽': '',
        '👸🏾': '',
        '👸🏿': '',
        '💂': '',
        '💂🏻': '',
        '💂🏼': '',
        '💂🏽': '',
        '💂🏾': '',
        '💂🏿': '',
        '👼': '',
        '👼🏻': '',
        '👼🏼': '',
        '👼🏽': '',
        '👼🏾': '',
        '👼🏿': '',
        '🎅': '',
        '🎅🏻': '',
        '🎅🏼': '',
        '🎅🏽': '',
        '🎅🏾': '',
        '🎅🏿': '',
        '👻': '',
        '👹': '',
        '👺': '',
        '💩': '',
        '💀': '',
        '👽': '',
        '👾': '',
        '🙇': '',
        '🙇🏻': '',
        '🙇🏼': '',
        '🙇🏽': '',
        '🙇🏾': '',
        '🙇🏿': '',
        '💁': '',
        '💁🏻': '',
        '💁🏼': '',
        '💁🏽': '',
        '💁🏾': '',
        '💁🏿': '',
        '🙅': '',
        '🙅🏻': '',
        '🙅🏼': '',
        '🙅🏽': '',
        '🙅🏾': '',
        '🙅🏿': '',
        '🙆': '',
        '🙆🏻': '',
        '🙆🏼': '',
        '🙆🏽': '',
        '🙆🏾': '',
        '🙆🏿': '',
        '🙋': '',
        '🙋🏻': '',
        '🙋🏼': '',
        '🙋🏽': '',
        '🙋🏾': '',
        '🙋🏿': '',
        '🙎': '',
        '🙎🏻': '',
        '🙎🏼': '',
        '🙎🏽': '',
        '🙎🏾': '',
        '🙎🏿': '',
        '🙍': '',
        '🙍🏻': '',
        '🙍🏼': '',
        '🙍🏽': '',
        '🙍🏾': '',
        '🙍🏿': '',
        '💆': '',
        '💆🏻': '',
        '💆🏼': '',
        '💆🏽': '',
        '💆🏾': '',
        '💆🏿': '',
        '💇': '',
        '💇🏻': '',
        '💇🏼': '',
        '💇🏽': '',
        '💇🏾': '',
        '💇🏿': '',
        '💑': '',
        '👩‍❤️‍👩': '',
        '👨‍❤️‍👨': '',
        '💏': '',
        '👩‍❤️‍💋‍👩': '',
        '👨‍❤️‍💋‍👨': '',
        '🙌': '',
        '🙌🏻': '',
        '🙌🏼': '',
        '🙌🏽': '',
        '🙌🏾': '',
        '🙌🏿': '',
        '👏': '',
        '👏🏻': '',
        '👏🏼': '',
        '👏🏽': '',
        '👏🏾': '',
        '👏🏿': '',
        '👂': '',
        '👂🏻': '',
        '👂🏼': '',
        '👂🏽': '',
        '👂🏾': '',
        '👂🏿': '',
        '👀': '',
        '👃': '',
        '👃🏻': '',
        '👃🏼': '',
        '👃🏽': '',
        '👃🏾': '',
        '👃🏿': '',
        '👄': '',
        '💋': '',
        '👅': '',
        '💅': '',
        '💅🏻': '',
        '💅🏼': '',
        '💅🏽': '',
        '💅🏾': '',
        '💅🏿': '',
        '👋': '',
        '👋🏻': '',
        '👋🏼': '',
        '👋🏽': '',
        '👋🏾': '',
        '👋🏿': '',
        '👍': '',
        '👍🏻': '',
        '👍🏼': '',
        '👍🏽': '',
        '👍🏾': '',
        '👍🏿': '',
        '👎': '',
        '👎🏻': '',
        '👎🏼': '',
        '👎🏽': '',
        '👎🏾': '',
        '👎🏿': '',
        '☝': '',
        '☝🏻': '',
        '☝🏼': '',
        '☝🏽': '',
        '☝🏾': '',
        '☝🏿': '',
        '👆': '',
        '👆🏻': '',
        '👆🏼': '',
        '👆🏽': '',
        '👆🏾': '',
        '👆🏿': '',
        '👇': '',
        '👇🏻': '',
        '👇🏼': '',
        '👇🏽': '',
        '👇🏾': '',
        '👇🏿': '',
        '👈': '',
        '👈🏻': '',
        '👈🏼': '',
        '👈🏽': '',
        '👈🏾': '',
        '👈🏿': '',
        '👉': '',
        '👉🏻': '',
        '👉🏼': '',
        '👉🏽': '',
        '👉🏾': '',
        '👉🏿': '',
        '👌': '',
        '👌🏻': '',
        '👌🏼': '',
        '👌🏽': '',
        '👌🏾': '',
        '👌🏿': '',
        '✌': '',
        '✌🏻': '',
        '✌🏼': '',
        '✌🏽': '',
        '✌🏾': '',
        '✌🏿': '',
        '👊': '',
        '👊🏻': '',
        '👊🏼': '',
        '👊🏽': '',
        '👊🏾': '',
        '👊🏿': '',
        '✊': '',
        '✊🏻': '',
        '✊🏼': '',
        '✊🏽': '',
        '✊🏾': '',
        '✊🏿': '',
        '✋': '',
        '✋🏻': '',
        '✋🏼': '',
        '✋🏽': '',
        '✋🏾': '',
        '✋🏿': '',
        '💪': '',
        '💪🏻': '',
        '💪🏼': '',
        '💪🏽': '',
        '💪🏾': '',
        '💪🏿': '',
        '👐': '',
        '👐🏻': '',
        '👐🏼': '',
        '👐🏽': '',
        '👐🏾': '',
        '👐🏿': '',
        '🙏': '',
        '🙏🏻': '',
        '🙏🏼': '',
        '🙏🏽': '',
        '🙏🏾': '',
        '🙏🏿': '',
        '🌱': '',
        '🌲': '',
        '🌳': '',
        '🌴': '',
        '🌵': '',
        '🌷': '',
        '🌸': '',
        '🌹': '',
        '🌺': '',
        '🌻': '',
        '🌼': '',
        '💐': '',
        '🌾': '',
        '🌿': '',
        '🍀': '',
        '🍁': '',
        '🍂': '',
        '🍃': '',
        '🍄': '',
        '🌰': '',
        '🐀': '',
        '🐁': '',
        '🐭': '',
        '🐹': '',
        '🐂': '',
        '🐃': '',
        '🐄': '',
        '🐮': '',
        '🐅': '',
        '🐆': '',
        '🐯': '',
        '🐇': '',
        '🐰': '',
        '🐈': '',
        '🐱': '',
        '🐎': '',
        '🐴': '',
        '🐏': '',
        '🐑': '',
        '🐐': '',
        '🐓': '',
        '🐔': '',
        '🐤': '',
        '🐣': '',
        '🐥': '',
        '🐦': '',
        '🐧': '',
        '🐘': '',
        '🐪': '',
        '🐫': '',
        '🐗': '',
        '🐖': '',
        '🐷': '',
        '🐽': '',
        '🐕': '',
        '🐩': '',
        '🐶': '',
        '🐺': '',
        '🐻': '',
        '🐨': '',
        '🐼': '',
        '🐵': '',
        '🙈': '',
        '🙉': '',
        '🙊': '',
        '🐒': '',
        '🐉': '',
        '🐲': '',
        '🐊': '',
        '🐍': '',
        '🐢': '',
        '🐸': '',
        '🐋': '',
        '🐳': '',
        '🐬': '',
        '🐙': '',
        '🐟': '',
        '🐠': '',
        '🐡': '',
        '🐚': '',
        '🐌': '',
        '🐛': '',
        '🐜': '',
        '🐝': '',
        '🐞': '',
        '🐾': '',
        '⚡️': '',
        '🔥': '',
        '🌙': '',
        '☀️': '',
        '⛅️': '',
        '☁️': '',
        '💧': '',
        '💦': '',
        '☔️': '',
        '💨': '',
        '❄️': '',
        '🌟': '',
        '⭐️': '',
        '🌠': '',
        '🌄': '',
        '🌅': '',
        '🌈': '',
        '🌊': '',
        '🌋': '',
        '🌌': '',
        '🗻': '',
        '🗾': '',
        '🌐': '',
        '🌍': '',
        '🌎': '',
        '🌏': '',
        '🌑': '',
        '🌒': '',
        '🌓': '',
        '🌔': '',
        '🌕': '',
        '🌖': '',
        '🌗': '',
        '🌘': '',
        '🌚': '',
        '🌝': '',
        '🌛': '',
        '🌜': '',
        '🌞': '',
        '🍅': '',
        '🍆': '',
        '🌽': '',
        '🍠': '',
        '🍇': '',
        '🍈': '',
        '🍉': '',
        '🍊': '',
        '🍋': '',
        '🍌': '',
        '🍍': '',
        '🍎': '',
        '🍏': '',
        '🍐': '',
        '🍑': '',
        '🍒': '',
        '🍓': '',
        '🍔': '',
        '🍕': '',
        '🍖': '',
        '🍗': '',
        '🍘': '',
        '🍙': '',
        '🍚': '',
        '🍛': '',
        '🍜': '',
        '🍝': '',
        '🍞': '',
        '🍟': '',
        '🍡': '',
        '🍢': '',
        '🍣': '',
        '🍤': '',
        '🍥': '',
        '🍦': '',
        '🍧': '',
        '🍨': '',
        '🍩': '',
        '🍪': '',
        '🍫': '',
        '🍬': '',
        '🍭': '',
        '🍮': '',
        '🍯': '',
        '🍰': '',
        '🍱': '',
        '🍲': '',
        '🍳': '',
        '🍴': '',
        '🍵': '',
        '☕': '',
        '🍶': '',
        '🍷': '',
        '🍸': '',
        '🍹': '',
        '🍼': '',
        '🎀': '',
        '🎁': '',
        '🎂': '',
        '🎃': '',
        '🎄': '',
        '🎋': '',
        '🎍': '',
        '🎑': '',
        '🎆': '',
        '🎇': '',
        '🎉': '',
        '🎊': '',
        '🎈': '',
        '💫': '',
        '✨': '',
        '💥': '',
        '🎓': '',
        '👑': '',
        '🎎': '',
        '🎏': '',
        '🎐': '',
        '🎌': '',
        '🏮': '',
        '💍': '',
        '❤️': '',
        '💔': '',
        '💌': '',
        '💕': '',
        '💞': '',
        '💓': '',
        '💗': '',
        '💖': '',
        '💘': '',
        '💝': '',
        '💟': '',
        '💜': '',
        '💛': '',
        '💚': '',
        '💙': '',
        '🏃': '',
        '🏃🏻': '',
        '🏃🏼': '',
        '🏃🏽': '',
        '🏃🏾': '',
        '🏃🏿': '',
        '🚶': '',
        '🚶🏻': '',
        '🚶🏼': '',
        '🚶🏽': '',
        '🚶🏾': '',
        '🚶🏿': '',
        '💃': '',
        '💃🏻': '',
        '💃🏼': '',
        '💃🏽': '',
        '💃🏾': '',
        '💃🏿': '',
        '🚣': '',
        '🚣🏻': '',
        '🚣🏼': '',
        '🚣🏽': '',
        '🚣🏾': '',
        '🚣🏿': '',
        '🏊': '',
        '🏊🏻': '',
        '🏊🏼': '',
        '🏊🏽': '',
        '🏊🏾': '',
        '🏊🏿': '',
        '🏄': '',
        '🏄🏻': '',
        '🏄🏼': '',
        '🏄🏽': '',
        '🏄🏾': '',
        '🏄🏿': '',
        '🛀': '',
        '🛀🏻': '',
        '🛀🏼': '',
        '🛀🏽': '',
        '🛀🏾': '',
        '🛀🏿': '',
        '🏂': '',
        '🎿': '',
        '⛄️': '',
        '🚴': '',
        '🚴🏻': '',
        '🚴🏼': '',
        '🚴🏽': '',
        '🚴🏾': '',
        '🚴🏿': '',
        '🚵': '',
        '🚵🏻': '',
        '🚵🏼': '',
        '🚵🏽': '',
        '🚵🏾': '',
        '🚵🏿': '',
        '🏇': '',
        '🏇🏻': '',
        '🏇🏼': '',
        '🏇🏽': '',
        '🏇🏾': '',
        '🏇🏿': '',
        '⛺️': '',
        '🎣': '',
        '⚽️': '',
        '🏀': '',
        '🏈': '',
        '⚾️': '',
        '🎾': '',
        '🏉': '',
        '⛳️': '',
        '🏆': '',
        '🎽': '',
        '🏁': '',
        '🎹': '',
        '🎸': '',
        '🎻': '',
        '🎷': '',
        '🎺': '',
        '🎵': '',
        '🎶': '',
        '🎼': '',
        '🎧': '',
        '🎤': '',
        '🎭': '',
        '🎫': '',
        '🎩': '',
        '🎪': '',
        '🎬': '',
        '🎨': '',
        '🎯': '',
        '🎱': '',
        '🎳': '',
        '🎰': '',
        '🎲': '',
        '🎮': '',
        '🎴': '',
        '🃏': '',
        '🀄️': '',
        '🎠': '',
        '🎡': '',
        '🎢': '',
        '🚃': '',
        '🚞': '',
        '🚂': '',
        '🚋': '',
        '🚝': '',
        '🚄': '',
        '🚅': '',
        '🚆': '',
        '🚇': '',
        '🚈': '',
        '🚉': '',
        '🚊': '',
        '🚌': '',
        '🚍': '',
        '🚎': '',
        '🚐': '',
        '🚑': '',
        '🚒': '',
        '🚓': '',
        '🚔': '',
        '🚨': '',
        '🚕': '',
        '🚖': '',
        '🚗': '',
        '🚘': '',
        '🚙': '',
        '🚚': '',
        '🚛': '',
        '🚜': '',
        '🚲': '',
        '🚏': '',
        '⛽️': '',
        '🚧': '',
        '🚦': '',
        '🚥': '',
        '🚀': '',
        '🚁': '',
        '✈️': '',
        '💺': '',
        '⚓️': '',
        '🚢': '',
        '🚤': '',
        '⛵️': '',
        '🚡': '',
        '🚠': '',
        '🚟': '',
        '🛂': '',
        '🛃': '',
        '🛄': '',
        '🛅': '',
        '💴': '',
        '💶': '',
        '💷': '',
        '💵': '',
        '🗽': '',
        '🗿': '',
        '🌁': '',
        '🗼': '',
        '⛲️': '',
        '🏰': '',
        '🏯': '',
        '🌇': '',
        '🌆': '',
        '🌃': '',
        '🌉': '',
        '🏠': '',
        '🏡': '',
        '🏢': '',
        '🏬': '',
        '🏭': '',
        '🏣': '',
        '🏤': '',
        '🏥': '',
        '🏦': '',
        '🏨': '',
        '🏩': '',
        '💒': '',
        '⛪️': '',
        '🏪': '',
        '🏫': '',
        '🇦🇺': '',
        '🇦🇹': '',
        '🇧🇪': '',
        '🇧🇷': '',
        '🇨🇦': '',
        '🇨🇱': '',
        '🇨🇳': '',
        '🇨🇴': '',
        '🇩🇰': '',
        '🇫🇮': '',
        '🇫🇷': '',
        '🇩🇪': '',
        '🇭🇰': '',
        '🇮🇳': '',
        '🇮🇩': '',
        '🇮🇪': '',
        '🇮🇱': '',
        '🇮🇹': '',
        '🇯🇵': '',
        '🇰🇷': '',
        '🇲🇴': '',
        '🇲🇾': '',
        '🇲🇽': '',
        '🇳🇱': '',
        '🇳🇿': '',
        '🇳🇴': '',
        '🇵🇭': '',
        '🇵🇱': '',
        '🇵🇹': '',
        '🇵🇷': '',
        '🇷🇺': '',
        '🇸🇦': '',
        '🇸🇬': '',
        '🇿🇦': '',
        '🇪🇸': '',
        '🇸🇪': '',
        '🇨🇭': '',
        '🇹🇷': '',
        '🇬🇧': '',
        '🇺🇸': '',
        '🇦🇪': '',
        '🇻🇳': '',
        '⌚️': '',
        '📱': '',
        '📲': '',
        '💻': '',
        '⏰': '',
        '⏳': '',
        '⌛️': '',
        '📷': '',
        '📹': '',
        '🎥': '',
        '📺': '',
        '📻': '',
        '📟': '',
        '📞': '',
        '☎️': '',
        '📠': '',
        '💽': '',
        '💾': '',
        '💿': '',
        '📀': '',
        '📼': '',
        '🔋': '',
        '🔌': '',
        '💡': '',
        '🔦': '',
        '📡': '',
        '💳': '',
        '💸': '',
        '💰': '',
        '💎': '',
        '🌂': '',
        '👝': '',
        '👛': '',
        '👜': '',
        '💼': '',
        '🎒': '',
        '💄': '',
        '👓': '',
        '👒': '',
        '👡': '',
        '👠': '',
        '👢': '',
        '👞': '',
        '👟': '',
        '👙': '',
        '👗': '',
        '👘': '',
        '👚': '',
        '👕': '',
        '👔': '',
        '👖': '',
        '🚪': '',
        '🚿': '',
        '🛁': '',
        '🚽': '',
        '💈': '',
        '💉': '',
        '💊': '',
        '🔬': '',
        '🔭': '',
        '🔮': '',
        '🔧': '',
        '🔪': '',
        '🔩': '',
        '🔨': '',
        '💣': '',
        '🚬': '',
        '🔫': '',
        '🔖': '',
        '📰': '',
        '🔑': '',
        '✉️': '',
        '📩': '',
        '📨': '',
        '📧': '',
        '📥': '',
        '📤': '',
        '📦': '',
        '📯': '',
        '📮': '',
        '📪': '',
        '📫': '',
        '📬': '',
        '📭': '',
        '📄': '',
        '📃': '',
        '📑': '',
        '📈': '',
        '📉': '',
        '📊': '',
        '📅': '',
        '📆': '',
        '🔅': '',
        '🔆': '',
        '📜': '',
        '📋': '',
        '📖': '',
        '📓': '',
        '📔': '',
        '📒': '',
        '📕': '',
        '📗': '',
        '📘': '',
        '📙': '',
        '📚': '',
        '📇': '',
        '🔗': '',
        '📎': '',
        '📌': '',
        '✂️': '',
        '📐': '',
        '📍': '',
        '📏': '',
        '🚩': '',
        '📁': '',
        '📂': '',
        '✒️': '',
        '✏️': '',
        '📝': '',
        '🔏': '',
        '🔐': '',
        '🔒': '',
        '🔓': '',
        '📣': '',
        '📢': '',
        '🔈': '',
        '🔉': '',
        '🔊': '',
        '🔇': '',
        '💤': '',
        '🔔': '',
        '🔕': '',
        '💭': '',
        '💬': '',
        '🚸': '',
        '🔍': '',
        '🔎': '',
        '🚫': '',
        '⛔️': '',
        '📛': '',
        '🚷': '',
        '🚯': '',
        '🚳': '',
        '🚱': '',
        '📵': '',
        '🔞': '',
        '🉑': '',
        '🉐': '',
        '💮': '',
        '㊙️': '',
        '㊗️': '',
        '🈴': '',
        '🈵': '',
        '🈲': '',
        '🈶': '',
        '🈚️': '',
        '🈸': '',
        '🈺': '',
        '🈷': '',
        '🈹': '',
        '🈳': '',
        '🈂': '',
        '🈁': '',
        '🈯️': '',
        '💹': '',
        '❇️': '',
        '✳️': '',
        '❎': '',
        '✅': '',
        '✴️': '',
        '📳': '',
        '📴': '',
        '🆚': '',
        '🅰': '',
        '🅱': '',
        '🆎': '',
        '🆑': '',
        '🅾': '',
        '🆘': '',
        '🆔': '',
        '🅿️': '',
        '🚾': '',
        '🆒': '',
        '🆓': '',
        '🆕': '',
        '🆖': '',
        '🆗': '',
        '🆙': '',
        '🏧': '',
        '♈️': '',
        '♉️': '',
        '♊️': '',
        '♋️': '',
        '♌️': '',
        '♍️': '',
        '♎️': '',
        '♏️': '',
        '♐️': '',
        '♑️': '',
        '♒️': '',
        '♓️': '',
        '🚻': '',
        '🚹': '',
        '🚺': '',
        '🚼': '',
        '♿️': '',
        '🚰': '',
        '🚭': '',
        '🚮': '',
        '▶️': '',
        '◀️': '',
        '🔼': '',
        '🔽': '',
        '⏩': '',
        '⏪': '',
        '⏫': '',
        '⏬': '',
        '➡️': '',
        '⬅️': '',
        '⬆️': '',
        '⬇️': '',
        '↗️': '',
        '↘️': '',
        '↙️': '',
        '↖️': '',
        '↕️': '',
        '↔️': '',
        '🔄': '',
        '↪️': '',
        '↩️': '',
        '⤴️': '',
        '⤵️': '',
        '🔀': '',
        '🔁': '',
        '🔂': '',
        '#⃣': '',
        '0⃣': '',
        '1⃣': '',
        '2⃣': '',
        '3⃣': '',
        '4⃣': '',
        '5⃣': '',
        '6⃣': '',
        '7⃣': '',
        '8⃣': '',
        '9⃣': '',
        '🔟': '',
        '🔢': '',
        '🔤': '',
        '🔡': '',
        '🔠': '',
        'ℹ️': '',
        '📶': '',
        '🎦': '',
        '🔣': '',
        '➕': '',
        '➖': '',
        '〰': '',
        '➗': '',
        '✖️': '',
        '✔️': '',
        '🔃': '',
        '™': '',
        '©': '',
        '®': '',
        '💱': '',
        '💲': '',
        '➰': '',
        '➿': '',
        '〽️': '',
        '❗️': '',
        '❓': '',
        '❕': '',
        '❔': '',
        '‼️': '',
        '⁉️': '',
        '❌': '',
        '⭕️': '',
        '💯': '',
        '🔚': '',
        '🔙': '',
        '🔛': '',
        '🔝': '',
        '🔜': '',
        '🌀': '',
        'Ⓜ️': '',
        '⛎': '',
        '🔯': '',
        '🔰': '',
        '🔱': '',
        '⚠️': '',
        '♨️': '',
        '♻️': '',
        '💢': '',
        '💠': '',
        '♠️': '',
        '♣️': '',
        '♥️': ''
    };

    headers = new HttpHeaders()
        .append('ignoreLoadingBar', '');

    constructor(private http: HttpClient) {
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
            if (message !== 'start_conversation') {
                this.messagesArray.push({
                    type: 'user',
                    messages: [{message: message}],
                    timestamp: new Date(Date.now()).toISOString()
                });
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

    /**
     * Get response message from api
     *
     * @param date (date of when you want to retrieve the response message)
     */
    getMessages(date) {
        // http call to oswald api
        return this.http.get(this.apiUrl + '/chats/' + this.chatbotId + '/session/' + this.session + '/latest/' + date, {headers: this.headers})
            .toPromise()
            .then(data => {
                if (data[0]) {
                    return this.processData(data[0]);
                }
            });
    }

    /**
     * Get all messages from the chatbot API that were send after a specific date.
     *
     * @param date (date of when you want to retrieve messages)
     */
    getSessionMessages(date) {
        // http call to oswald api
        return this.http.get(this.apiUrl + '/chats/' + this.chatbotId + '/session/' + this.session + '/latest/' + date, {headers: this.headers})
            .toPromise()
            .then(data => {
                if (data[0]) {
                    return this.processSessionData(data);
                }
            });
    }

    /**
     * Set up a chat stream to retrieve messages that are send by the user and bot.
     *
     * @param dateTime (date of when you want to retrieve messages)
     * @param stop (true = start chat stream, false = stop chat stream)
     */
    openChatStream(dateTime, stop) {
        let date = dateTime;
        if (stop === true) {
            clearInterval(this.intervalId);
        } else {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => {
                this.getMessages(date).then(data => {
                    if (data) {
                        date = data;
                    }
                });
            }, 1000);
        }
    }

    /**
     * Stop current chat stream.
     */
    closeChatStream() {
        // set current datetime
        const date = new Date(Date.now());

        // clear interval
        this.openChatStream(date, true);
    }

    /**
     * process the data that comes from the data stream.
     *
     * @param response (response of the data stream)
     */
    processData(response) {
        const messages = [];
        const quickReplies = [];
        let senderType;

        // set sender type
        if (response['type'] === 'out') {
            senderType = 'chatbot';
        } else if (response['type'] === 'takeover') {
            senderType = 'takeover';
        }

        // loading messages
        for (let i = 0; i < response['data'].length; i++) {
            switch (response['data'][i]['type']) {
                case 'text':
                    messages.push({type: 'text', message: response['data'][i]['message']});
                    break;
                case 'url':
                    messages.push({
                        type: 'url',
                        message: response['data'][i]['message'],
                        url: response['data'][i]['url']
                    });
                    break;
                case 'image':
                    messages.push({type: 'image', image: response['data'][i]['image']});
                    break;
            }
        }

        // loading quick replies
        if (response['quickReplies']) {
            for (let i = 0; i < response['quickReplies'].length; i++) {
                quickReplies.push({
                    text: response['quickReplies'][i]['text'],
                    action: response['quickReplies'][i]['action']
                });
            }
        }

        // put messagesArray in behaviorsubject
        this.messagesArray.push({
            type: senderType,
            messages: messages,
            quickReplies: quickReplies,
            timestamp: response['createdAt']
        });

        this.messages.next(this.messagesArray);

        return response['createdAt'];
    }

    /**
     * process the session data
     *
     * @param response (response of the data stream)
     */
    processSessionData(response) {
        for (let j = 0; j < response.length; j++) {
            const messages = [];
            const quickReplies = [];
            let senderType;

            // set sender type
            if (response[j]['type'] === 'out') {
                senderType = 'chatbot';
            } else if (response[j]['type'] === 'takeover') {
                senderType = 'takeover';
            }

            // load question
            if (response[j]['metadata']) {
                if (response[j]['metadata']['sentence'] !== 'start_conversation') {
                    this.messagesArray.push({
                        type: 'user',
                        messages: [{message: response[j]['metadata']['sentence']}],
                        timestamp: response[j]['createdAt']
                    });
                }
            }

            // loading messages
            for (let i = 0; i < response[j]['data'].length; i++) {
                switch (response[j]['data'][i]['type']) {
                    case 'text':
                        messages.push({type: 'text', message: response[j]['data'][i]['message']});
                        break;
                    case 'url':
                        messages.push({
                            type: 'url',
                            message: response[j]['data'][i]['message'],
                            url: response[j]['data'][i]['url']
                        });
                        break;
                    case 'image':
                        messages.push({type: 'image', image: response[j]['data'][i]['image']});
                        break;
                }
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

            // put messagesArray in behaviorsubject
            this.messagesArray.push({
                type: senderType,
                messages: messages,
                quickReplies: quickReplies,
                timestamp: response[j]['createdAt']
            });
        }

        this.messages.next(this.messagesArray);

        if (response[response.length - 1]) {
            return response[response.length - 1]['createdAt'];
        }
    }

    /**
     * Get all the messages of your current session.
     * Is triggered when messagesArray is empty, but the session still exists.
     */
    getSession() {
        const sessionObject = JSON.parse(sessionStorage.getItem('chatbotSession'));

        if (this.messagesArray.length <= 0) {
            // get previous messages of session
            this.processSessionData(this.getSessionMessages(sessionObject.timestamp));
        }
    }

    /**
     * Sets the session when opening the chatbot.
     *
     * If a sessionId is detected in sessionStorage, that sessionId is used.
     * If the sessionStorage lacks a sessionId, a new session is created.
     */
    setSession() {
        const sessionObject = JSON.parse(sessionStorage.getItem('chatbotSession'));

        // set up new sessionId if it doesn't exist
        if (sessionObject !== null) {
            // set sessionId
            this.session = sessionObject.sessionId;

            // open stream
            this.openChatStream(new Date(Date.now()).toISOString(), false);

            return false;
        } else {
            const date = new Date(Date.now());
            date.setSeconds(date.getSeconds() - 10);

            this.newSession(date);

            // open stream
            this.openChatStream(date.toISOString(), false);

            return true;
        }
    }

    /**
     * Make new session when there is no sessionId in sessionStorage.
     *
     * @param date (current date)
     */
    newSession(date) {
        // clear messages when new session
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
