import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TranslationService {
    constructor(http) {
        this.http = http;
        this.translations = [];
        this.map = new Map();
    }
    loadTranslations(url) {
        return new Promise((resolve, reject) => {
            this.http
                .get(url)
                .toPromise()
                .then((translations) => {
                this.setTranslations(translations);
                resolve();
            }, (error) => {
                console.error('Error loading translations:', error);
                reject(error);
            });
        });
    }
    setTranslations(translations) {
        this.translations = translations;
        this.map = new Map(this.translations.map((obj) => [obj.key, obj.value]));
    }
    translate(key) {
        return this.map.get(key) || key;
    }
    isTranslationsLoaded() {
        return this.translations.length > 0;
    }
}
TranslationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslationService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
TranslationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NoYXJlZC1jb21wb25lbnRzL3NyYy9saWIvcmVzb3VyY2VzL3RyYW5zbGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUg1QixpQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUM5QixRQUFHLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7SUFFRCxDQUFDO0lBRXhDLGdCQUFnQixDQUFDLEdBQVc7UUFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsSUFBSTtpQkFDTixHQUFHLENBQWEsR0FBRyxDQUFDO2lCQUNwQixTQUFTLEVBQUU7aUJBQ1gsSUFBSSxDQUNILENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUNGLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlLENBQUMsWUFBd0I7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Z0hBbkNVLGtCQUFrQjtvSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07NEZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLZXlWYWx1ZSB9IGZyb20gJy4vc3RyaW5ncyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIHRyYW5zbGF0aW9uczogS2V5VmFsdWVbXSA9IFtdO1xuICBwcml2YXRlIG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGxvYWRUcmFuc2xhdGlvbnModXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwXG4gICAgICAgIC5nZXQ8S2V5VmFsdWVbXT4odXJsKVxuICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgKHRyYW5zbGF0aW9ucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGlvbnModHJhbnNsYXRpb25zKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyB0cmFuc2xhdGlvbnM6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRUcmFuc2xhdGlvbnModHJhbnNsYXRpb25zOiBLZXlWYWx1ZVtdKSB7XG4gICAgdGhpcy50cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnM7XG4gICAgdGhpcy5tYXAgPSBuZXcgTWFwKHRoaXMudHJhbnNsYXRpb25zLm1hcCgob2JqKSA9PiBbb2JqLmtleSwgb2JqLnZhbHVlXSkpO1xuICB9XG5cbiAgdHJhbnNsYXRlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGtleSkgfHwga2V5O1xuICB9XG5cbiAgaXNUcmFuc2xhdGlvbnNMb2FkZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRpb25zLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiJdfQ==