import { Component, OnInit, TemplateRef } from '@angular/core';
import Chart from 'chart.js';
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public isCollapsed = true;
  public labels:any;
  Activity: any;
  request: any;
  ActivityList: any;
  activity: any[];
  levelList: any;
    ngOnInit(){
      this.chartColor = "#FFFFFF";
      this.getActivity();
    } 

    constructor(private globalService: GlobalService) {
      this.activity = [];
      this.ActivityList = [];
      this.levelList=[];
    }
    getActivity() {
      this.globalService.getModel("/activity").then(
        result => {
          console.log(result);
          this.ActivityList = result;
        },
        err => {
          console.log(err);
        }
      );
      this.globalService.getModel("/level").then(
        result => {
          console.log(result);
          this.levelList = result;
        },
        err => {
          console.log(err);
        }
      );
    }
  
}