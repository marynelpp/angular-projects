import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  countries: any;
  selectedCountry:any;
  
  ngOnInit() {
    this.getActivity();
        this.countries = [
            { id: 1, name: "India"},
            { id: 2, name: "USA" },
            { id: 3, name: "China" },
            { id: 4, name: "Japan" }
        ];
 
        this.selectedCountry = [{
            id: 1,
            name: "India"
        }];
    }
    
  

  title = 'AngularCRUDExample';
  UserList: any;
  HardwareList: any;
  levelList: any;
  ActivityList: any;
  activity: any;
  bsModalRef: BsModalRef;
  user: any;
  titleModal: string = "";
  save: boolean = false;
  edit: boolean = false;
  constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
    this.user = [];
    this.activity = [];
    this.ActivityList = [];
  }
  OpenActivityModal(template: TemplateRef<any>, option, index: number) {
    console.log(this.selectedCountry);
    this.activity = [];


    if (option === "save") {
      this.activity = [];
      this.titleModal = 'activity';
      this.save = true;
    } else
      if (option === "edit") {
        this.titleModal = 'activity';
        this.save = true;
        console.log(this.ActivityList[index])
        this.activity = this.ActivityList[index];
        this.activity.activId = this.activity.activId
        this.showActivity();
        console.log(this.activity);
      } else
        if (option === 'delete') {

          this.activity.hardwareID = this.ActivityList[index].hardwareID;
          this.activity.levelID = this.ActivityList[index].levelID;
        }

    this.ActivityList = [];
    this.bsModalRef = this.bsModalService.show(template);

  }

  getActivity() {
    this.globalService.getModel("/activity").then(
      result => {
        console.log(result);
        this.ActivityList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );


    this.globalService.getModel("/hardware").then(
      result => {
        console.log(result);
        this.HardwareList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
    this.globalService.getModel("/level").then(
      result => {
        console.log(result);
        this.levelList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
  }

  showActivity() {
    console.log(this.activity);
    this.globalService.getModel("/activity/user/" + this.activity.UserID).then(
      result => {
        console.log(result);
        this.ActivityList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );


  }

  deleteActivity(index) {
    this.activity.hardwareID = this.ActivityList[index].hardwareID;
    this.activity.levelID = this.ActivityList[index].levelID;
    console.log(this.activity);
    let postAss = {
      "userID": this.activity.UserID,
      "levelId": this.activity.levelId,
      "hardwareID": this.activity.HardwareID,
    };

    this.globalService.addModel(postAss, "/activity/delete").then(
      result => {
        console.log(result);
        // this.getActivity();
        this.showActivity();
      },
      err => {
        console.log(err);

        //this.loader.dismiss();
      }
    );
   
   this.save=true;
  }

  editActivity(index) {
    console.log(this.user)

    let postUser = {
      'id': this.user.id,
      'userName': this.user.userName,
      'Name': this.user.name,
      'lastName': this.user.lastName,
      'Age': this.user.age,
      'lastSessionDateTime': '2019-08-05T15:02:29.393'
    };

    this.globalService.updateModel(this.user.id, postUser, "/activity").then(
      result => {
        console.log(result);
        this.getActivity();
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );

    this.onClose()
  }


  saveActivity() {
    console.log(this.activity)

    let postAss = {
      "userID": this.activity.UserID,
      "levelId": this.activity.levelId,
      "hardwareID": this.activity.HardwareID,
    };
    console.log(postAss);

    this.globalService.addModel(postAss, "/activity").then(
      result => {
        console.log(result);
        //this.getactivity();
        this.showActivity();
      },
      err => {
        console.log(err);
      }
    );
    this.activity.levelID = null;
    this.activity.HardwareID = null;

  }

  onClose() {
    this.edit = false;
    this.save = false;
    this.bsModalRef.hide();
  }


}
