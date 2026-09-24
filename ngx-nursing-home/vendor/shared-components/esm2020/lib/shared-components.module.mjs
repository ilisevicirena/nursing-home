import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbButtonModule, NbCheckboxModule, NbIconModule, NbLayoutModule, NbSpinnerModule, NbTagModule, NbThemeModule, NbTooltipModule, NbSelectModule, NbProgressBarModule, NbActionsModule, NbToggleModule, NbDatepickerModule, NbInputModule, NbFormFieldModule, NbTimepickerModule, NbUserModule, NbWindowModule, NbDialogModule, NbCardModule, NbContextMenuModule, NbPopoverModule, NbAutocompleteModule, NbAccordionModule, NbAlertModule, NbButtonGroupModule, } from '@nebular/theme';
import { SharedComponentsComponent } from './shared-components.component';
import { TestViewComponent } from './test-view/test-view.component';
import { BytePipe, FilepickerComponent, } from './filepicker/filepicker.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { FileCardComponent } from './file-card/file-card.component';
import { ProgressbarSpinnerComponent } from './progressbar-spinner/progressbar-spinner.component';
import { TagsAutocompleteComponent } from './tags-autocomplete/tags-autocomplete.component';
import { SelectGridComponent } from './select-grid/select-grid.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GridComponent } from './grid/grid.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CellDisplayComponent } from './grid/cell-display/cell-display.component';
import { ColumnFilterComponent } from './grid/column-filter/column-filter.component';
import { CellEditComponent } from './grid/cell-edit/cell-edit.component';
import { PopupComponent } from './grid/popup/popup.component';
import { GridPdfExportComponent } from './grid/export/grid-pdf-export/grid-pdf-export.component';
import { GridExcelExportComponent } from './grid/export/grid-excel-export/grid-excel-export.component';
import { DeletePopupComponent } from './grid/delete-popup/delete-popup.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { NgxColorsModule } from 'ngx-colors';
import { TagComponent } from './tag/tag.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SelectGridPopoverComponent } from './select-grid/select-grid-popover/select-grid-popover.component';
import { ResizedDirective } from './resources/resize-directive/resize-directive';
import { GridFooterComponent } from './grid/grid-footer/grid-footer.component';
import { GridToolbarComponent } from './grid/grid-toolbar/grid-toolbar.component';
import * as i0 from "@angular/core";
import * as i1 from "@nebular/theme";
import * as i2 from "@nebular/date-fns";
export class SharedComponentsModule {
}
SharedComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, declarations: [SharedComponentsComponent,
        TestViewComponent,
        FilepickerComponent,
        BytePipe,
        FileCardComponent,
        ProgressbarSpinnerComponent,
        TagsAutocompleteComponent,
        SelectGridComponent,
        ScheduleComponent,
        ResizedDirective,
        GridComponent,
        CellDisplayComponent,
        ColumnFilterComponent,
        CellEditComponent,
        PopupComponent,
        GridPdfExportComponent,
        GridExcelExportComponent,
        DeletePopupComponent,
        ColorPickerComponent,
        TagComponent,
        TextEditorComponent,
        SelectGridPopoverComponent,
        GridFooterComponent,
        GridToolbarComponent], imports: [NbTagModule,
        NbButtonModule,
        NbLayoutModule, i1.NbThemeModule, NbIconModule,
        NbTooltipModule,
        CommonModule,
        NbCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        NbSpinnerModule,
        NbSelectModule,
        NbProgressBarModule,
        NbActionsModule,
        NbToggleModule,
        NbDatepickerModule,
        NbInputModule,
        NbFormFieldModule, i2.NbDateFnsDateModule, i1.NbTimepickerModule, NbUserModule, i1.NbWindowModule, i1.NbDialogModule, NbCardModule,
        NbContextMenuModule,
        NbPopoverModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbAlertModule,
        NgxPaginationModule,
        NbButtonGroupModule,
        NgxColorsModule,
        NgxSummernoteModule], exports: [SharedComponentsComponent,
        TestViewComponent,
        FilepickerComponent,
        FileCardComponent,
        ProgressbarSpinnerComponent,
        TagsAutocompleteComponent,
        SelectGridComponent,
        ScheduleComponent,
        ResizedDirective,
        GridComponent,
        ColorPickerComponent,
        TagComponent,
        TextEditorComponent] });
SharedComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, imports: [NbTagModule,
        NbButtonModule,
        NbLayoutModule,
        NbThemeModule.forRoot(),
        NbIconModule,
        NbTooltipModule,
        CommonModule,
        NbCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        NbSpinnerModule,
        NbSelectModule,
        NbProgressBarModule,
        NbActionsModule,
        NbToggleModule,
        NbDatepickerModule,
        NbInputModule,
        NbFormFieldModule,
        NbDateFnsDateModule.forRoot({
            format: 'dd.MM.yyyy.',
        }),
        NbTimepickerModule.forRoot({ format: 'HH:mm' }),
        NbUserModule,
        NbWindowModule.forChild(),
        NbDialogModule.forChild(),
        NbCardModule,
        NbContextMenuModule,
        NbPopoverModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbAlertModule,
        NgxPaginationModule,
        NbButtonGroupModule,
        NgxColorsModule,
        NgxSummernoteModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SharedComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SharedComponentsComponent,
                        TestViewComponent,
                        FilepickerComponent,
                        BytePipe,
                        FileCardComponent,
                        ProgressbarSpinnerComponent,
                        TagsAutocompleteComponent,
                        SelectGridComponent,
                        ScheduleComponent,
                        ResizedDirective,
                        GridComponent,
                        CellDisplayComponent,
                        ColumnFilterComponent,
                        CellEditComponent,
                        PopupComponent,
                        GridPdfExportComponent,
                        GridExcelExportComponent,
                        DeletePopupComponent,
                        ColorPickerComponent,
                        TagComponent,
                        TextEditorComponent,
                        SelectGridPopoverComponent,
                        GridFooterComponent,
                        GridToolbarComponent,
                    ],
                    imports: [
                        NbTagModule,
                        NbButtonModule,
                        NbLayoutModule,
                        NbThemeModule.forRoot(),
                        NbIconModule,
                        NbTooltipModule,
                        CommonModule,
                        NbCheckboxModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NbSpinnerModule,
                        NbSelectModule,
                        NbProgressBarModule,
                        NbActionsModule,
                        NbToggleModule,
                        NbDatepickerModule,
                        NbInputModule,
                        NbFormFieldModule,
                        NbDateFnsDateModule.forRoot({
                            format: 'dd.MM.yyyy.',
                        }),
                        NbTimepickerModule.forRoot({ format: 'HH:mm' }),
                        NbUserModule,
                        NbWindowModule.forChild(),
                        NbDialogModule.forChild(),
                        NbCardModule,
                        NbContextMenuModule,
                        NbPopoverModule,
                        NbAutocompleteModule,
                        NbAccordionModule,
                        NbAlertModule,
                        NgxPaginationModule,
                        NbButtonGroupModule,
                        NgxColorsModule,
                        NgxSummernoteModule,
                    ],
                    exports: [
                        SharedComponentsComponent,
                        TestViewComponent,
                        FilepickerComponent,
                        FileCardComponent,
                        ProgressbarSpinnerComponent,
                        TagsAutocompleteComponent,
                        SelectGridComponent,
                        ScheduleComponent,
                        ResizedDirective,
                        GridComponent,
                        ColorPickerComponent,
                        TagComponent,
                        TextEditorComponent,
                    ],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc2hhcmVkLWNvbXBvbmVudHMvc3JjL2xpYi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osY0FBYyxFQUNkLGVBQWUsRUFDZixXQUFXLEVBQ1gsYUFBYSxFQUNiLGVBQWUsRUFDZixjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixjQUFjLEVBQ2QsY0FBYyxFQUNkLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLG1CQUFtQixHQUNwQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFDTCxRQUFRLEVBQ1IsbUJBQW1CLEdBQ3BCLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUs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QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDdkIsWUFBWTt3QkFDWixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLG1CQUFtQixDQUFDLE9BQU8sQ0FBQzs0QkFDMUIsTUFBTSxFQUFFLGFBQWE7eUJBQ3RCLENBQUM7d0JBQ0Ysa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO3dCQUMvQyxZQUFZO3dCQUNaLGNBQWMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3pCLGNBQWMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3pCLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHlCQUF5Qjt3QkFDekIsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQixnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixZQUFZO3dCQUNaLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBOYkJ1dHRvbk1vZHVsZSxcclxuICBOYkNoZWNrYm94TW9kdWxlLFxyXG4gIE5iSWNvbk1vZHVsZSxcclxuICBOYkxheW91dE1vZHVsZSxcclxuICBOYlNwaW5uZXJNb2R1bGUsXHJcbiAgTmJUYWdNb2R1bGUsXHJcbiAgTmJUaGVtZU1vZHVsZSxcclxuICBOYlRvb2x0aXBNb2R1bGUsXHJcbiAgTmJTZWxlY3RNb2R1bGUsXHJcbiAgTmJQcm9ncmVzc0Jhck1vZHVsZSxcclxuICBOYkFjdGlvbnNNb2R1bGUsXHJcbiAgTmJUb2dnbGVNb2R1bGUsXHJcbiAgTmJEYXRlcGlja2VyTW9kdWxlLFxyXG4gIE5iSW5wdXRNb2R1bGUsXHJcbiAgTmJGb3JtRmllbGRNb2R1bGUsXHJcbiAgTmJUaW1lcGlja2VyTW9kdWxlLFxyXG4gIE5iVXNlck1vZHVsZSxcclxuICBOYldpbmRvd01vZHVsZSxcclxuICBOYkRpYWxvZ01vZHVsZSxcclxuICBOYkNhcmRNb2R1bGUsXHJcbiAgTmJDb250ZXh0TWVudU1vZHVsZSxcclxuICBOYlBvcG92ZXJNb2R1bGUsXHJcbiAgTmJBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgTmJBY2NvcmRpb25Nb2R1bGUsXHJcbiAgTmJBbGVydE1vZHVsZSxcclxuICBOYkJ1dHRvbkdyb3VwTW9kdWxlLFxyXG59IGZyb20gJ0BuZWJ1bGFyL3RoZW1lJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c0NvbXBvbmVudCB9IGZyb20gJy4vc2hhcmVkLWNvbXBvbmVudHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVzdFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3Rlc3Qtdmlldy90ZXN0LXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBCeXRlUGlwZSxcclxuICBGaWxlcGlja2VyQ29tcG9uZW50LFxyXG59IGZyb20gJy4vZmlsZXBpY2tlci9maWxlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOYkRhdGVGbnNEYXRlTW9kdWxlIH0gZnJvbSAnQG5lYnVsYXIvZGF0ZS1mbnMnO1xyXG5pbXBvcnQgeyBGaWxlQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vZmlsZS1jYXJkL2ZpbGUtY2FyZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcm9ncmVzc2JhclNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzYmFyLXNwaW5uZXIvcHJvZ3Jlc3NiYXItc3Bpbm5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUYWdzQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi90YWdzLWF1dG9jb21wbGV0ZS90YWdzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZWxlY3RHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtZ3JpZC9zZWxlY3QtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTY2hlZHVsZUNvbXBvbmVudCB9IGZyb20gJy4vc2NoZWR1bGUvc2NoZWR1bGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IENlbGxEaXNwbGF5Q29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL2NlbGwtZGlzcGxheS9jZWxsLWRpc3BsYXkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL2NvbHVtbi1maWx0ZXIvY29sdW1uLWZpbHRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDZWxsRWRpdENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9jZWxsLWVkaXQvY2VsbC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRQZGZFeHBvcnRDb21wb25lbnQgfSBmcm9tICcuL2dyaWQvZXhwb3J0L2dyaWQtcGRmLWV4cG9ydC9ncmlkLXBkZi1leHBvcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZEV4Y2VsRXhwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL2V4cG9ydC9ncmlkLWV4Y2VsLWV4cG9ydC9ncmlkLWV4Y2VsLWV4cG9ydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEZWxldGVQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9kZWxldGUtcG9wdXAvZGVsZXRlLXBvcHVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neENvbG9yc01vZHVsZSB9IGZyb20gJ25neC1jb2xvcnMnO1xyXG5pbXBvcnQgeyBUYWdDb21wb25lbnQgfSBmcm9tICcuL3RhZy90YWcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGV4dEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1lZGl0b3IvdGV4dC1lZGl0b3IuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4U3VtbWVybm90ZU1vZHVsZSB9IGZyb20gJ25neC1zdW1tZXJub3RlJztcclxuaW1wb3J0IHsgU2VsZWN0R3JpZFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1ncmlkL3NlbGVjdC1ncmlkLXBvcG92ZXIvc2VsZWN0LWdyaWQtcG9wb3Zlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZXNpemVkRGlyZWN0aXZlIH0gZnJvbSAnLi9yZXNvdXJjZXMvcmVzaXplLWRpcmVjdGl2ZS9yZXNpemUtZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgR3JpZEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9ncmlkLWZvb3Rlci9ncmlkLWZvb3Rlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHcmlkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9ncmlkLXRvb2xiYXIvZ3JpZC10b29sYmFyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c0NvbXBvbmVudCxcclxuICAgIFRlc3RWaWV3Q29tcG9uZW50LFxyXG4gICAgRmlsZXBpY2tlckNvbXBvbmVudCxcclxuICAgIEJ5dGVQaXBlLFxyXG4gICAgRmlsZUNhcmRDb21wb25lbnQsXHJcbiAgICBQcm9ncmVzc2JhclNwaW5uZXJDb21wb25lbnQsXHJcbiAgICBUYWdzQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgU2VsZWN0R3JpZENvbXBvbmVudCxcclxuICAgIFNjaGVkdWxlQ29tcG9uZW50LFxyXG4gICAgUmVzaXplZERpcmVjdGl2ZSxcclxuICAgIEdyaWRDb21wb25lbnQsXHJcbiAgICBDZWxsRGlzcGxheUNvbXBvbmVudCxcclxuICAgIENvbHVtbkZpbHRlckNvbXBvbmVudCxcclxuICAgIENlbGxFZGl0Q29tcG9uZW50LFxyXG4gICAgUG9wdXBDb21wb25lbnQsXHJcbiAgICBHcmlkUGRmRXhwb3J0Q29tcG9uZW50LFxyXG4gICAgR3JpZEV4Y2VsRXhwb3J0Q29tcG9uZW50LFxyXG4gICAgRGVsZXRlUG9wdXBDb21wb25lbnQsXHJcbiAgICBDb2xvclBpY2tlckNvbXBvbmVudCxcclxuICAgIFRhZ0NvbXBvbmVudCxcclxuICAgIFRleHRFZGl0b3JDb21wb25lbnQsXHJcbiAgICBTZWxlY3RHcmlkUG9wb3ZlckNvbXBvbmVudCxcclxuICAgIEdyaWRGb290ZXJDb21wb25lbnQsXHJcbiAgICBHcmlkVG9vbGJhckNvbXBvbmVudCxcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIE5iVGFnTW9kdWxlLFxyXG4gICAgTmJCdXR0b25Nb2R1bGUsXHJcbiAgICBOYkxheW91dE1vZHVsZSxcclxuICAgIE5iVGhlbWVNb2R1bGUuZm9yUm9vdCgpLFxyXG4gICAgTmJJY29uTW9kdWxlLFxyXG4gICAgTmJUb29sdGlwTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTmJDaGVja2JveE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5iU3Bpbm5lck1vZHVsZSxcclxuICAgIE5iU2VsZWN0TW9kdWxlLFxyXG4gICAgTmJQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE5iQWN0aW9uc01vZHVsZSxcclxuICAgIE5iVG9nZ2xlTW9kdWxlLFxyXG4gICAgTmJEYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgTmJJbnB1dE1vZHVsZSxcclxuICAgIE5iRm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTmJEYXRlRm5zRGF0ZU1vZHVsZS5mb3JSb290KHtcclxuICAgICAgZm9ybWF0OiAnZGQuTU0ueXl5eS4nLFxyXG4gICAgfSksXHJcbiAgICBOYlRpbWVwaWNrZXJNb2R1bGUuZm9yUm9vdCh7IGZvcm1hdDogJ0hIOm1tJyB9KSxcclxuICAgIE5iVXNlck1vZHVsZSxcclxuICAgIE5iV2luZG93TW9kdWxlLmZvckNoaWxkKCksXHJcbiAgICBOYkRpYWxvZ01vZHVsZS5mb3JDaGlsZCgpLFxyXG4gICAgTmJDYXJkTW9kdWxlLFxyXG4gICAgTmJDb250ZXh0TWVudU1vZHVsZSxcclxuICAgIE5iUG9wb3Zlck1vZHVsZSxcclxuICAgIE5iQXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgTmJBY2NvcmRpb25Nb2R1bGUsXHJcbiAgICBOYkFsZXJ0TW9kdWxlLFxyXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcclxuICAgIE5iQnV0dG9uR3JvdXBNb2R1bGUsXHJcbiAgICBOZ3hDb2xvcnNNb2R1bGUsXHJcbiAgICBOZ3hTdW1tZXJub3RlTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c0NvbXBvbmVudCxcclxuICAgIFRlc3RWaWV3Q29tcG9uZW50LFxyXG4gICAgRmlsZXBpY2tlckNvbXBvbmVudCxcclxuICAgIEZpbGVDYXJkQ29tcG9uZW50LFxyXG4gICAgUHJvZ3Jlc3NiYXJTcGlubmVyQ29tcG9uZW50LFxyXG4gICAgVGFnc0F1dG9jb21wbGV0ZUNvbXBvbmVudCxcclxuICAgIFNlbGVjdEdyaWRDb21wb25lbnQsXHJcbiAgICBTY2hlZHVsZUNvbXBvbmVudCxcclxuICAgIFJlc2l6ZWREaXJlY3RpdmUsXHJcbiAgICBHcmlkQ29tcG9uZW50LFxyXG4gICAgQ29sb3JQaWNrZXJDb21wb25lbnQsXHJcbiAgICBUYWdDb21wb25lbnQsXHJcbiAgICBUZXh0RWRpdG9yQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB7fVxyXG4iXX0=