import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'sample-person-popup-window',
  templateUrl: './person-popup-window.component.html',
  styleUrls: ['./person-popup-window.component.scss']
})
export class PersonPopupWindowComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private ref: NbWindowRef) { }

  public personId: number;
  public person: any;

  @ViewChild("headerTemplate") headerTemplate!: TemplateRef<any>;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.add("h-100");
      window.parentElement.classList.add("w-100");
      window.parentElement.parentElement.classList.add("h-100");
      window.parentElement.parentElement.style.width = "75%";
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.add("d-block");
      }
    }

    this.ref.config.titleTemplate = this.headerTemplate;
  }

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      //     window.parentElement.parentElement.style.width = "75%";
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.remove("d-block");
      }
    }
  }
}
