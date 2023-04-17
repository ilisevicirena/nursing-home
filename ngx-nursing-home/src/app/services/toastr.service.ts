import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(private toastrService: NbToastrService, protected configService: ConfigService, protected router: Router) { }

  public showToast(type: NbComponentStatus, title: string, body: string): void {
    const config = {
      status: type,
      destroyByClick: true,
      duration: type === 'danger' ? 15000 : 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  public showToastPreventDuplicates(type: NbComponentStatus, title: string, body: string): void {
    const config = {
      status: type,
      destroyByClick: true,
      duration: type === 'danger' ? 15000 : 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  public showToastWithCustumIcon(type: NbComponentStatus, title: string, body: string, icon: string): void {
    const config = {
      status: type,
      destroyByClick: true,
      duration: type === 'danger' ? 10000 : 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
      icon: { icon: icon, pack: 'eva' }
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
