import { OnDestroy, OnInit } from '@angular/core';
import { NbComponentShape, NbTagAppearance } from '@nebular/theme';
import * as i0 from "@angular/core";
export declare class TagComponent implements OnInit, OnDestroy {
    icon: string;
    text: string;
    color: string;
    shape: NbComponentShape;
    appearance: NbTagAppearance;
    isEvaIcon: boolean;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    hexToRgbA(hex: string | undefined): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TagComponent, "ngx-tag", never, { "icon": "icon"; "text": "text"; "color": "color"; "shape": "shape"; "appearance": "appearance"; "isEvaIcon": "isEvaIcon"; }, {}, never, never, false, never>;
}
