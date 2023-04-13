import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnDestroy, OnInit {

  constructor(private testService: TestService) { }

  ngOnDestroy() {

  }

  ngOnInit(): void {
    this.testService.getData().subscribe((data) => {
      console.log(data);
    })
  }
}
