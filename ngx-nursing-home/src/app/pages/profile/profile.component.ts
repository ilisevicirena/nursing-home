import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonsService, getIPersonFromJSON } from '../../services/rest/persons.service';
import { getString } from '../../resources/strings';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../services/toastr.service';
import { GendersService } from '../../services/rest/genders.service';

@Component({
  selector: 'sample-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService,
    private toastrService: ToastrService,
    private gendersService: GendersService,
  ) { }

  private personId: number = 0;
  private subscriptions: Subscription[] = [];

  public activeView: string = "basicData";
  public person: any = {};
  public newPersonData: any = {};
  public loading: boolean = false;
  public getString = getString;
  public showSidepanel: boolean = true;
  public genders: any[] = [];
  public options: any[] = [
    {
      option: 'basicData',
      string: 'basicData',
      active: true,
    },
    {
      option: 'contacts',
      string: 'contacts',
      active: false,
    },
    {
      option: 'stayData',
      string: 'stayData',
      active: false,
    },
    {
      option: 'dormatoryData',
      string: 'dormatoryData',
      active: false,
    },
    {
      option: 'services',
      string: 'services',
      active: false,
    },
    {
      option: 'documents',
      string: 'documents',
      active: false,
    },
    {
      option: 'notes',
      string: 'notes',
      active: false,
    }
  ];

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(this.activatedRoute.paramMap.subscribe((params) => {
      this.personId = params.get('id') as any;
      this.getPersonDetails(this.personId);
      this.getGenders();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  private getPersonDetails(personId): void {
    this.subscriptions.push(this.personsService.getPersonDetails(personId).subscribe(data => {
      if (data.length > 0) {
        this.person = getIPersonFromJSON(data[0]);
        this.newPersonData = getIPersonFromJSON(data[0]);
        console.log(data)
      }

      this.loading = false;
    }));
  }

  public toggleSidepanel(): void {
    this.showSidepanel = !this.showSidepanel;
  }

  public saveBasicData(form: NgForm): void {
    this.subscriptions.push(this.personsService.update(this.newPersonData).subscribe(() => {
      this.getPersonDetails(this.personId);
      form.form.markAsPristine();
      this.toastrService.showToast("success", getString('saveSuccess'), "");
    }, err => {
      console.error(err);
      this.toastrService.showToast("danger", getString('saveError'), "");
    }));
  }

  public cancelEditBasicData(form: NgForm) {
    this.newPersonData = this.person;
    form.form.markAsPristine();
  }

  public getGenders(): void {
    this.subscriptions.push(this.gendersService.getData().subscribe(data => {
      this.genders = data;
    }, err => {
      console.error(err);
    }));
  }

  public toggleView(view: any): void {
    this.options.find(x => x.option == this.activeView)!.active = false;
    view.active = true;
    this.activeView = view.option;
  }
}
