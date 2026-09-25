/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import '@angular/compiler';
import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Ensure pdfMake and its virtual file system are available globally
declare const require: any;
try {
  const pdfMake: any = require('pdfmake/build/pdfmake');
  const pdfFonts: any = require('pdfmake/build/vfs_fonts');
  const vfs = (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) || pdfFonts.vfs || pdfFonts;
  if (pdfMake) {
    pdfMake.vfs = vfs;
    (window as any).pdfMake = pdfMake;
  }
} catch (e) {
  // If pdfmake isn't present at runtime, ignore — shared components may still load later
}

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .catch(err => console.error(err));
