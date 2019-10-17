import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  //countries: any;
  //selectedCountry:any;

  countries;
    selectedCountry;

  
  
  ngOnInit() {
      this.getActivity();
        this.getTechnologys();

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
  technologyList: any;
  technology:any;
  activity: any;
  bsModalRef: BsModalRef;
  user: any;
  titleModal: string = "";
  save: boolean = false;
  edit: boolean = false;
  technologies: any;
  constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
    this.user = [];
    this.activity = [];
    this.ActivityList = [];
    this.technology= [];
    this.technologyList = [];
    this.technologies=[];
  }

  
  OpenActivityModal(template: TemplateRef<any>, option, index: number) {
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
        //this.showActivity();
        console.log(this.activity);
      } else
        if (option === 'delete') {

          this.activity.activId = this.ActivityList[index].levelID;
        }

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

    


    /*this.globalService.getModel("/hardware").then(
      result => {
        console.log(result);
        this.HardwareList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );*/
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

  getTechnologys() {
    this.globalService.getModel("/technology").then(
        result => {
          console.log(result);
          this.technologyList = result;
          this.technologyList.map(item=>{
            this.technology.push({ id: item.techId, name: item.techName})
          })
        },
        err => {
          console.log(err);
        }
      );
}
  

  showActivity() {
    console.log(this.activity);
    this.globalService.getModel("/activity/" + this.activity.activId).then(
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
    let postActivity = {
      'activId': this.activity.activId,
      'subjet': this.activity.subjet,
      'description': this.activity.description,
      'levelId': this.activity.levelId,
    };

    this.globalService.addModel(postActivity, "/activity/delete").then(
      result => {
        console.log(result);
        this.getActivity();
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

    let postActivity = {
      'activId': this.activity.activId,
      'subjet': this.activity.subjet,
      'description': this.activity.description,
      'levelId': this.activity.levelId,
    };

    this.globalService.updateModel(this.user.id, postActivity , "/activity").then(
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
    console.log(this.technologies)
    let arraytech=[];
    this.technologies.map(item=>{
      arraytech.push(item.id)

      
      })
    let postActivity  = {
      "subjet": this.activity.subjet,
      "description": this.activity.description,
      "levelId": this.activity.levelId,
      "technologies": arraytech
    };

    
    console.log(postActivity);

    this.globalService.addModel(postActivity , "/activity").then(
      result => {
        console.log(result);
        //this.getactivity();
        this.showActivity();
      },
      err => {
        console.log(err);
      }
    );

  }

  onClose() {
    this.edit = false;
    this.save = false;
    this.bsModalRef.hide();
  }


}
