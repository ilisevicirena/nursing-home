import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app',
  template: '<nb-layout><nb-layout-column class="p-0"><router-outlet></router-outlet></nb-layout-column></nb-layout>',
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }
}
