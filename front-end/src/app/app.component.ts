import {ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, LocationStrategy} from '@angular/common';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, ObservableInput, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoadingService} from './_services/loading.service';
import {SwUpdate} from '@angular/service-worker';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, HttpInterceptor {
    private _isPopState = false;
    private _routeScrollPositions: { [url: string]: number } = {};
    private _deferredRestore = false;
    loading: Boolean = false;
    error: Boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private router: Router,
                private locStrat: LocationStrategy,
                private loadingService: LoadingService,
                private swUpdate: SwUpdate) {
    }

    ngOnInit(): void {

        // Message to update app when on PWA
        this.swUpdate.available.subscribe(evt => {
                if (confirm('De Beerless app is aangepast. Wil je de nieuwe versie openen?')) {
                    window.location.reload();
                }
            });

        if (isPlatformBrowser(this.platformId)) {
            // prevent nguniversal problems
            this.addScrollTopListeners();
        }

        this.loadingService.loading$.subscribe(value => {
            this.loading = value;
        });
        this.loadingService.error$.subscribe(value => {
            this.error = value;
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.startLoading();
        // console.log();

        return next.handle(req)
            .pipe(
                tap(event => {
                    if (event.type !== 0) {
                        console.log(event);
                        this.loadingService.finishLoading();
                        this.loadingService.noError();
                    }
                }),
                catchError( err => {
                    this.loadingService.hasError();
                    this.loadingService.finishLoading();
                    return of(err);
                })
            );
    }

    /**
     * Save the current ``window.pageYOffset`` in {@link _routeScrollPositions}, keyed by the given url.
     *
     * @param url scroll route
     */
    private saveScroll(url) {
        this._routeScrollPositions[url] = window.pageYOffset;
    }

    /**
     * Attempt to restore the scroll position for the given url. The scroll position is restored only if the body clientHeight is big
     * enough to accomodate it. {@link _deferredRestore} is reset to false on success or if there is no saved scroll posiiton for the url.
     *
     * @param url key in {@link _routeScrollPositions}
     * @returns {boolean} true if the scroll position was changed
     */
    private restoreScroll(url) {
        const savedScroll = this._routeScrollPositions[url];
        if (savedScroll === undefined) {
            // no saved scroll position for this url :(
            this._deferredRestore = false;
            return false;
        }

        const documentHeight = document.body.clientHeight, windowHeight = window.innerHeight;

        if (savedScroll + windowHeight <= documentHeight) {
            // document is already tall enough to scroll directly
            window.scrollTo(0, savedScroll);
            this._deferredRestore = false;
            return true;
        }

        return false;
    }

    private addScrollTopListeners() {
        // force scroll position at top of page when route changes through routerLink navigation
        //  (and not when it changes through browser back/forward)
        //  https://github.com/angular/angular/issues/10929#issuecomment-372265497
        // remember and restore scroll positions when navigating using back/forward
        //  https://github.com/angular/angular/issues/10929#issuecomment-274264962

        if ('scrollRestoration' in history) {
            // disable automatic scroll restoration by browsers, since it's doing a bad job
            // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
            history.scrollRestoration = 'manual';
        }

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                // the position should not be saved at NavigationStart during popstate navigation because it will already be mangled
                if (!this._isPopState) {
                    // save scroll position of urls on router navigation
                    // at NavigationStart, router.url is still the url of the current route (not the target of the navigation)
                    this.saveScroll(this.router.url);
                }
            }

            if (event instanceof NavigationEnd) {
                if (this._isPopState) {
                    // popstate navigation, try to restore saved scroll position immediately
                    // immediate restoration might be possible if the source view is taller than the target view
                    if (!this.restoreScroll(event.url)) {
                        // document is too short, and restoring the saved scroll position would not work;
                        // defer the restoration to the next tick, when document should be reflowed and reach its target height
                        setTimeout(() => {
                            if (this._deferredRestore) {
                                this.restoreScroll(event.url);
                                this._deferredRestore = false;
                            }
                        });

                        // using _deferredRestore, the route is marked for restoring its scroll position at a later time
                        // attempts are made to restore the scroll position in ngAfterContentChecked; it's most likely that this will
                        //  happen in the current tick, but setTimeout is added just in case
                        this._deferredRestore = true;
                    }
                } else {
                    // scroll to top on regular router navigation
                    window.scrollTo(0, 0);
                }

                // end of navigation event, remove _isPopState flag
                this._isPopState = false;
            }
        });

        this.locStrat.onPopState(() => {
            // during a navigation event we must know if it was triggered by popstate navigation or regular router navigation
            this._isPopState = true;

            // on browser back/forward navigation, popstate is fired before any Navigation or other router events
            // router.url is still the current route and the position must be saved here because it can be
            // mangled by browser behavior before reaching NavigationStart
            this.saveScroll(this.router.url);
        });
    }

    ngAfterContentChecked() {
        if (this._deferredRestore) {
            // ngAfterContentChecked is used to try and restore the scroll position in the
            // same tick as the first document reflow which makes it possible (i.e. before setTimeout)
            // this could prevent scroll flashes/jankiness
            this.restoreScroll(this.router.url);
        }
    }
}
