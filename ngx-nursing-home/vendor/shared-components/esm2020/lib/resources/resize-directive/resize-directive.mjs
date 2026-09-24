import { Directive, EventEmitter, Output } from '@angular/core';
import { ResizedEvent } from './resized-event.class';
import * as i0 from "@angular/core";
export class ResizedDirective {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.resized = new EventEmitter();
        this.observer = new ResizeObserver(entries => this.zone.run(() => this.observe(entries)));
    }
    ngOnInit() {
        this.observer.observe(this.element.nativeElement);
    }
    ngOnDestroy() {
        this.observer.disconnect();
    }
    observe(entries) {
        const domSize = entries[0];
        const resizedEvent = new ResizedEvent(domSize.contentRect, this.oldRect);
        this.oldRect = domSize.contentRect;
        this.resized.emit(resizedEvent);
    }
}
ResizedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ResizedDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
ResizedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: ResizedDirective, selector: "[resized]", outputs: { resized: "resized" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ResizedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[resized]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { resized: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NoYXJlZC1jb21wb25lbnRzL3NyYy9saWIvcmVzb3VyY2VzL3Jlc2l6ZS1kaXJlY3RpdmUvcmVzaXplLWRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBNkIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFLckQsTUFBTSxPQUFPLGdCQUFnQjtJQU96QixZQUNxQixPQUFtQixFQUNuQixJQUFZO1FBRFosWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLE9BQU8sQ0FBQyxPQUE4QjtRQUMxQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OzhHQTVCUSxnQkFBZ0I7a0dBQWhCLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQUg1QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO2lCQUN4QjtzSEFNbUIsT0FBTztzQkFEdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVzaXplZEV2ZW50IH0gZnJvbSAnLi9yZXNpemVkLWV2ZW50LmNsYXNzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcmVzaXplZF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICBwcml2YXRlIG9sZFJlY3Q/OiBET01SZWN0UmVhZE9ubHk7XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVzaXplZDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgem9uZTogTmdab25lXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc2l6ZWRFdmVudD4oKTtcclxuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGVudHJpZXMgPT4gdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLm9ic2VydmUoZW50cmllcykpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ic2VydmUoZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZG9tU2l6ZSA9IGVudHJpZXNbMF07XHJcbiAgICAgICAgY29uc3QgcmVzaXplZEV2ZW50ID0gbmV3IFJlc2l6ZWRFdmVudChkb21TaXplLmNvbnRlbnRSZWN0LCB0aGlzLm9sZFJlY3QpO1xyXG4gICAgICAgIHRoaXMub2xkUmVjdCA9IGRvbVNpemUuY29udGVudFJlY3Q7XHJcbiAgICAgICAgdGhpcy5yZXNpemVkLmVtaXQocmVzaXplZEV2ZW50KTtcclxuICAgIH1cclxufVxyXG4iXX0=