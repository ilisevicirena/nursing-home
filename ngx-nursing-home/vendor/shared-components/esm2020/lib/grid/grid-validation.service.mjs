import { Injectable } from '@angular/core';
import { GRID_DATA_TYPE } from '../resources/mode-enums';
import * as i0 from "@angular/core";
export class GridValidationService {
    static validate(columns, rowData) {
        var isValid = true;
        columns.forEach((element) => {
            if (element.getEditorSettings().getRequired() &&
                !rowData[element.getDataField()]) {
                if (element.getEditor() == GRID_DATA_TYPE.NUMBERBOX &&
                    rowData[element.getDataField()] == 0)
                    isValid = true;
                else {
                    isValid = false;
                    return;
                }
            }
            else if (element.getEditor() == GRID_DATA_TYPE.TEXTBOX &&
                element.getEditorSettings().getPattern().length > 0 &&
                rowData[element.getDataField()]?.length > 0) {
                var re = new RegExp(element.getEditorSettings().getPattern());
                isValid = re.test(rowData[element.getDataField()]);
            }
        });
        return isValid;
    }
}
GridValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GridValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridValidationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GridValidationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC12YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zaGFyZWQtY29tcG9uZW50cy9zcmMvbGliL2dyaWQvZ3JpZC12YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBS3pELE1BQU0sT0FBTyxxQkFBcUI7SUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFxQixFQUFFLE9BQVk7UUFDeEQsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDO1FBRTVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMxQixJQUNFLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFdBQVcsRUFBRTtnQkFDekMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQ2hDO2dCQUNBLElBQ0UsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLGNBQWMsQ0FBQyxTQUFTO29CQUMvQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQztvQkFFcEMsT0FBTyxHQUFHLElBQUksQ0FBQztxQkFDWjtvQkFDSCxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNoQixPQUFPO2lCQUNSO2FBQ0Y7aUJBQU0sSUFDTCxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksY0FBYyxDQUFDLE9BQU87Z0JBQzdDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFDM0M7Z0JBQ0EsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O21IQTdCVSxxQkFBcUI7dUhBQXJCLHFCQUFxQixjQUZwQixNQUFNOzRGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWxzL2dyaWQtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IEdSSURfREFUQV9UWVBFIH0gZnJvbSAnLi4vcmVzb3VyY2VzL21vZGUtZW51bXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR3JpZFZhbGlkYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZShjb2x1bW5zOiBHcmlkQ29sdW1uW10sIHJvd0RhdGE6IGFueSk6IGJvb2xlYW4ge1xuICAgIHZhciBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBlbGVtZW50LmdldEVkaXRvclNldHRpbmdzKCkuZ2V0UmVxdWlyZWQoKSAmJlxuICAgICAgICAhcm93RGF0YVtlbGVtZW50LmdldERhdGFGaWVsZCgpXVxuICAgICAgKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBlbGVtZW50LmdldEVkaXRvcigpID09IEdSSURfREFUQV9UWVBFLk5VTUJFUkJPWCAmJlxuICAgICAgICAgIHJvd0RhdGFbZWxlbWVudC5nZXREYXRhRmllbGQoKV0gPT0gMFxuICAgICAgICApXG4gICAgICAgICAgaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGVsZW1lbnQuZ2V0RWRpdG9yKCkgPT0gR1JJRF9EQVRBX1RZUEUuVEVYVEJPWCAmJlxuICAgICAgICBlbGVtZW50LmdldEVkaXRvclNldHRpbmdzKCkuZ2V0UGF0dGVybigpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgcm93RGF0YVtlbGVtZW50LmdldERhdGFGaWVsZCgpXT8ubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoZWxlbWVudC5nZXRFZGl0b3JTZXR0aW5ncygpLmdldFBhdHRlcm4oKSk7XG4gICAgICAgIGlzVmFsaWQgPSByZS50ZXN0KHJvd0RhdGFbZWxlbWVudC5nZXREYXRhRmllbGQoKV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH1cbn1cbiJdfQ==