import { HttpClient } from '@angular/common/http';
import { KeyValue } from './strings';
import * as i0 from "@angular/core";
export declare class TranslationService {
    private http;
    private translations;
    private map;
    constructor(http: HttpClient);
    loadTranslations(url: string): Promise<void>;
    setTranslations(translations: KeyValue[]): void;
    translate(key: string): string;
    isTranslationsLoaded(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslationService>;
}
