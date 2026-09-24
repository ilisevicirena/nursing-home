import { EventEmitter } from '@angular/core';
export class GridPopup {
    static getFileMenuItemClickEvent() {
        return this.fileMenuItemClick;
    }
    static emitFileMenuItemClickEvent(model) {
        this.fileMenuItemClick.emit(model);
    }
    static getPopupConfiguration(isNew, editRecordTitle, columns, data, saveBtnTitle, cancelBtnTitle, showMinimizeBtn, showMaximizeBtn, showFullScreenBtn, hasBacktrop, closeOnBackdropClick, closeOnEscClick, requiredTooltip) {
        var conf = {
            title: editRecordTitle,
            context: {
                isNew: isNew,
                columns: columns,
                data: data,
                saveBtnText: saveBtnTitle,
                cancelBtnText: cancelBtnTitle,
                reqiredTooltip: requiredTooltip,
            },
            buttons: {
                minimize: showMinimizeBtn,
                maximize: showMaximizeBtn,
                fullScreen: showFullScreenBtn,
                close: true,
            },
            hasBackdrop: hasBacktrop,
            closeOnBackdropClick: closeOnBackdropClick,
            closeOnEsc: closeOnEscClick,
            windowClass: 'popup-window',
        };
        return conf;
    }
    static getDeletePopupConfiguration(deletePopupSettings) {
        var conf = {
            context: {
                settings: deletePopupSettings,
            },
            autoFocus: false,
            closeOnBackdropClick: deletePopupSettings.closeOnBackdropClick,
            closeOnEsc: deletePopupSettings.closeOnEsc,
        };
        return conf;
    }
}
GridPopup.fileMenuItemClick = new EventEmitter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wb3B1cC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3NoYXJlZC1jb21wb25lbnRzL3NyYy9saWIvZ3JpZC9wb3B1cC9ncmlkLXBvcHVwLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPN0MsTUFBTSxPQUFnQixTQUFTO0lBSXRCLE1BQU0sQ0FBQyx5QkFBeUI7UUFDckMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUVNLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxLQUF1QjtRQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxNQUFNLENBQUMscUJBQXFCLENBQ2pDLEtBQWMsRUFDZCxlQUFtQyxFQUNuQyxPQUFxQixFQUNyQixJQUFTLEVBQ1QsWUFBZ0MsRUFDaEMsY0FBa0MsRUFDbEMsZUFBd0IsRUFDeEIsZUFBd0IsRUFDeEIsaUJBQTBCLEVBQzFCLFdBQW9CLEVBQ3BCLG9CQUE2QixFQUM3QixlQUF3QixFQUN4QixlQUFtQztRQUVuQyxJQUFJLElBQUksR0FBUTtZQUNkLEtBQUssRUFBRSxlQUFlO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUUsT0FBTztnQkFDaEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLFlBQVk7Z0JBQ3pCLGFBQWEsRUFBRSxjQUFjO2dCQUM3QixjQUFjLEVBQUUsZUFBZTthQUNoQztZQUNELE9BQU8sRUFBRTtnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFVBQVUsRUFBRSxpQkFBaUI7Z0JBQzdCLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRCxXQUFXLEVBQUUsV0FBVztZQUN4QixvQkFBb0IsRUFBRSxvQkFBb0I7WUFDMUMsVUFBVSxFQUFFLGVBQWU7WUFDM0IsV0FBVyxFQUFFLGNBQWM7U0FDNUIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLE1BQU0sQ0FBQywyQkFBMkIsQ0FDdkMsbUJBQTZDO1FBRTdDLElBQUksSUFBSSxHQUFRO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7WUFDRCxTQUFTLEVBQUUsS0FBSztZQUNoQixvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQyxvQkFBb0I7WUFDOUQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLFVBQVU7U0FDM0MsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7QUFoRWMsMkJBQWlCLEdBQzlCLElBQUksWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JpZENvbHVtbiB9IGZyb20gJy4uLy4uL21vZGVscy9ncmlkLWNvbHVtbi5tb2RlbCc7XHJcbmltcG9ydCB7XHJcbiAgSUdyaWREZWxldGVQb3B1cFNldHRpbmdzLFxyXG4gIElHcmlkUm93TWVudUl0ZW0sXHJcbn0gZnJvbSAnLi4vLi4vbW9kZWxzL2dyaWQubW9kZWwnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdyaWRQb3B1cCB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZmlsZU1lbnVJdGVtQ2xpY2s6IEV2ZW50RW1pdHRlcjxJR3JpZFJvd01lbnVJdGVtPiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmlsZU1lbnVJdGVtQ2xpY2tFdmVudCgpOiBFdmVudEVtaXR0ZXI8SUdyaWRSb3dNZW51SXRlbT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsZU1lbnVJdGVtQ2xpY2s7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVtaXRGaWxlTWVudUl0ZW1DbGlja0V2ZW50KG1vZGVsOiBJR3JpZFJvd01lbnVJdGVtKTogdm9pZCB7XHJcbiAgICB0aGlzLmZpbGVNZW51SXRlbUNsaWNrLmVtaXQobW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRQb3B1cENvbmZpZ3VyYXRpb24oXHJcbiAgICBpc05ldzogYm9vbGVhbixcclxuICAgIGVkaXRSZWNvcmRUaXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgY29sdW1uczogR3JpZENvbHVtbltdLFxyXG4gICAgZGF0YTogYW55LFxyXG4gICAgc2F2ZUJ0blRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdG5UaXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgc2hvd01pbmltaXplQnRuOiBib29sZWFuLFxyXG4gICAgc2hvd01heGltaXplQnRuOiBib29sZWFuLFxyXG4gICAgc2hvd0Z1bGxTY3JlZW5CdG46IGJvb2xlYW4sXHJcbiAgICBoYXNCYWNrdHJvcDogYm9vbGVhbixcclxuICAgIGNsb3NlT25CYWNrZHJvcENsaWNrOiBib29sZWFuLFxyXG4gICAgY2xvc2VPbkVzY0NsaWNrOiBib29sZWFuLFxyXG4gICAgcmVxdWlyZWRUb29sdGlwOiBzdHJpbmcgfCB1bmRlZmluZWRcclxuICApOiBhbnkge1xyXG4gICAgdmFyIGNvbmY6IGFueSA9IHtcclxuICAgICAgdGl0bGU6IGVkaXRSZWNvcmRUaXRsZSxcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgIGlzTmV3OiBpc05ldyxcclxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgc2F2ZUJ0blRleHQ6IHNhdmVCdG5UaXRsZSxcclxuICAgICAgICBjYW5jZWxCdG5UZXh0OiBjYW5jZWxCdG5UaXRsZSxcclxuICAgICAgICByZXFpcmVkVG9vbHRpcDogcmVxdWlyZWRUb29sdGlwLFxyXG4gICAgICB9LFxyXG4gICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgbWluaW1pemU6IHNob3dNaW5pbWl6ZUJ0bixcclxuICAgICAgICBtYXhpbWl6ZTogc2hvd01heGltaXplQnRuLFxyXG4gICAgICAgIGZ1bGxTY3JlZW46IHNob3dGdWxsU2NyZWVuQnRuLFxyXG4gICAgICAgIGNsb3NlOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBoYXNCYWNrZHJvcDogaGFzQmFja3Ryb3AsXHJcbiAgICAgIGNsb3NlT25CYWNrZHJvcENsaWNrOiBjbG9zZU9uQmFja2Ryb3BDbGljayxcclxuICAgICAgY2xvc2VPbkVzYzogY2xvc2VPbkVzY0NsaWNrLFxyXG4gICAgICB3aW5kb3dDbGFzczogJ3BvcHVwLXdpbmRvdycsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBjb25mO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXREZWxldGVQb3B1cENvbmZpZ3VyYXRpb24oXHJcbiAgICBkZWxldGVQb3B1cFNldHRpbmdzOiBJR3JpZERlbGV0ZVBvcHVwU2V0dGluZ3NcclxuICApOiBhbnkge1xyXG4gICAgdmFyIGNvbmY6IGFueSA9IHtcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgIHNldHRpbmdzOiBkZWxldGVQb3B1cFNldHRpbmdzLFxyXG4gICAgICB9LFxyXG4gICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICBjbG9zZU9uQmFja2Ryb3BDbGljazogZGVsZXRlUG9wdXBTZXR0aW5ncy5jbG9zZU9uQmFja2Ryb3BDbGljayxcclxuICAgICAgY2xvc2VPbkVzYzogZGVsZXRlUG9wdXBTZXR0aW5ncy5jbG9zZU9uRXNjLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gY29uZjtcclxuICB9XHJcbn1cclxuIl19