import { Component, OnInit } from '@angular/core';
import { SampleInputs } from '../documentation/documentation.model';

@Component({
  selector: 'sample-progressbar-spinner',
  templateUrl: './progressbar-spinner.component.html',
  styleUrls: ['./progressbar-spinner.component.scss']
})
export class ProgressbarSpinnerComponent implements OnInit {

  constructor() { }

  public firstSpinnerValue: number = 0;
  public secondSpinnerValue: number = 0;
  public firstSpinnerLoading: boolean = false;
  public secondSpinnerLoading: boolean = false;

  ngOnInit(): void {
    this.firstLoading();
    this.secondLoading();
  }

  public firstLoading(): void {
    this.firstSpinnerValue = 0;
    setTimeout(() => {
      this.firstSpinnerLoading = true;
    }, 2000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 3000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 7000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 9000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 11000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 15000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 17000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 20000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 25000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 27000);
    setTimeout(() => {
      this.firstSpinnerValue = this.firstSpinnerValue + 10;
    }, 30000);
    setTimeout(() => {
      this.firstSpinnerLoading = false;
    }, 31000);
  }

  public secondLoading(): void {
    this.secondSpinnerValue = 0;
    setTimeout(() => {
      this.secondSpinnerLoading = true;
    }, 2000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 3000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 7000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 9000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 11000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 15000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 17000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 20000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 25000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 27000);
    setTimeout(() => {
      this.secondSpinnerValue = this.secondSpinnerValue + 10;
    }, 30000);
    setTimeout(() => {
      this.secondSpinnerLoading = false;
    }, 31000);
  }

  //------------------------------------------------------ DOCUMENTATION -----------------------------------------------------

  public inputItems: SampleInputs[] = [
    {
      title: "loading",
      description: "omogućava/onemogućava spinner (default: false)"
    },
    {
      title: "status",
      description: "boja spinnera i progressbara (default: primary)"
    },
    {
      title: "size",
      description: "veličina spinnera i progressbara (default: large)"
    },
    {
      title: "message",
      description: "poruka za prikaz unutar spinnera, prazan string onemogućava poruku (default: Učitavanje)"
    },
    {
      title: "value",
      description: "vrijednost progressbara, vrijednost je brojka 0-100 (default: 0)"
    },
    {
      title: "displayValue",
      description: "omogućava/onemogućava prikaz postotka unutar progressbara (default: false)"
    },
    {
      title: "progressbarSize",
      description: "klasa za veličinu progressbara, klasa bi trebala biti neka bootstrap klasa npr. col-md-6, col-3, col-sm-4 (default: col-10)"
    },
  ];

  public outputItems: SampleInputs[] = [];
  public methodsItems: SampleInputs[] = [];
}
