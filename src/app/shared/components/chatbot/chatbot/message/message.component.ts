import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Input,
    OnInit, Renderer2,
    ViewChild, ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {BreweryprofileComponent} from '../../../../platform-components/breweryprofile/breweryprofile/breweryprofile.component';
import {ChatbotComponent} from '../chatbot.component';
import {BeerprofileComponent} from '../../../../platform-components/beerprofile/beerprofile/beerprofile.component';
import {DragScrollComponent} from 'ngx-drag-scroll/lib';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: []
})
export class MessageComponent implements OnInit {

    @Input() delay: number;
    @Input() messageIndex: number;
    @Input() type: string;
    @Input() message: string;

    @ViewChild('component', {read: ViewContainerRef}) set loadMessage(component) {
        this.load(component);
    }

    @ViewChildren('nav', {read: DragScrollComponent}) set loadDragScroll(nav) {
        this.ds = nav;
    }

    component;
    showMessageItem = false;
    showMessage = false;
    text;
    src;
    isComponent = false;
    isImage = false;
    ds;

    constructor(private chatbotComponent: ChatbotComponent, private componentFactoryResolver: ComponentFactoryResolver, private cdref: ChangeDetectorRef, private renderer2: Renderer2) {
    }

    ngOnInit() {
        if (this.type !== 'user') {
            if (this.delay > 0) {
                setTimeout(() => {
                    this.showMessage = true;
                }, Number((this.delay * this.messageIndex) + this.delay));
            } else {
                this.showMessage = true;
            }
        } else {
            this.showMessage = true;
        }
    }

    load(component) {
        if (component) {
            if (this.message['type']) {
                switch (this.message['type']) {
                    case 'text':
                        // check if beer profile
                        if (this.message['message']['app-beerprofile']) {

                            this.loadComponent(component, BeerprofileComponent, this.message['message']['app-beerprofile'][0]);
                        } else if (this.message['message']['app-breweryprofile']) {
                            this.isComponent = true;

                            // add component
                            const factory = this.componentFactoryResolver.resolveComponentFactory(BreweryprofileComponent);
                            const ref = component.createComponent(factory);
                            this.renderer2.setAttribute(ref.location.nativeElement, 'item', JSON.stringify(this.message['message']['app-breweryprofile'][0]));
                            ref.changeDetectorRef.detectChanges();
                        }

                        this.text = this.message['message'];
                        this.cdref.detectChanges();
                        break;
                    case 'url':
                        this.text = this.message['message'];
                        this.cdref.detectChanges();

                        this.src = this.message['url'];
                        this.cdref.detectChanges();

                        break;
                    case 'image':
                        this.isImage = true;
                        this.src = this.message['image'];
                        this.cdref.detectChanges();
                        break;
                    case 'location':
                        this.text = this.message['message'];
                        let query = '';
                        for (const location in this.message['location']) {
                            query += this.message['location'][location] + '+';
                        }
                        this.src = 'https://www.google.com/maps/embed/v1/place?key=' + environment.mapsAPIKey + '&q=' + query;
                        this.cdref.detectChanges();
                        break;
                    case 'elements':
                        break;
                }
            } else {
                this.text = this.message['message'];
                this.cdref.detectChanges();
            }
        }
    }

    moveLeft() {
        this.ds.first.moveLeft();
    }

    moveRight() {
        this.ds.first.moveRight();
    }

    loadComponent(component, entryComponent, message) {
        this.isComponent = true;

        // add component
        const factory = this.componentFactoryResolver.resolveComponentFactory(entryComponent);
        const ref = component.createComponent(factory);
        this.renderer2.setAttribute(ref.location.nativeElement, 'item', JSON.stringify(message));
        ref.changeDetectorRef.detectChanges();
    }
}
