import { EventEmitter, OnInit } from '@angular/core';
import { TranslationService } from '../resources/translation.service';
import * as i0 from "@angular/core";
export declare class TextEditorComponent implements OnInit {
    private translationService;
    constructor(translationService: TranslationService);
    ngOnInit(): void;
    private _text;
    placeholder: string;
    set text(value: string);
    get text(): string;
    textChange: EventEmitter<any>;
    config: {
        placeholder: string;
        toolbar: (string | string[])[][];
        fontNames: string[];
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<TextEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextEditorComponent, "ngx-text-editor", never, { "placeholder": "placeholder"; "text": "text"; }, { "textChange": "textChange"; }, never, never, false, never>;
}
