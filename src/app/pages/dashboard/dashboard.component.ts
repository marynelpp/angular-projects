import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalService } from "../providers/global.service";
import { RemoteService } from "../providers/remote.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  pageActual: number = 1;
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public isCollapsed = true;
  public labels:any;
  request: any;
  prospectList: any;
  bsModalRef: BsModalRef;
  software: any;
  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;

  UserList: any;

  prospect;
  selectedsoftware;

    ngOnInit(){
      this.chartColor = "#FFFFFF";
      this.getUser();

      this.software = [
        { id: 1, name: "Postman"},
        { id: 2, name: "Visual Studio" },
        { id: 3, name: "Eclipse" },
    ];
    
    this.selectedsoftware = [{
        id: 1,
        name: "Postman"
    }];
    } 

   

    constructor(private globalService: GlobalService, private remoteService: RemoteService, private bsModalService: BsModalService) {
  
      this.UserList = [];
    }

    OpenTechnologyModal(template: TemplateRef<any>, option, index:number) {
      
      this.bsModalRef = this.bsModalService.show(template);
      
    }
    getUser() {
      this.remoteService.getModel("/v2/agents").then(
        result => {
          console.log(result);
          this.UserList = result;
        },
        err => {
          console.log(err);
        }
      );
    }

    getprospects() {
      this.globalService.getModel("/prospect").then(
          result => {
            console.log(result);
            this.prospectList = result;
          },
          err => {
            console.log(err);
            //this.loader.dismiss();
          }
        );
  }
  
  

  deleteprospect() {
    this.globalService.removeModel(this.prospect.id,"/prospect").then(
      result => {
        console.log(result);
        this.getprospects();
      },
      err => {
        console.log(err);
        
        //this.loader.dismiss();
      }
    );
    
    this.onClose()
  }

  editprospect() {
    console.log(this.prospect)
    
    let postprospect = {
      'prospect_id': this.prospect.id,
      'prospect_name': this.prospect.prospectName,
      
    };

    this.globalService.updateModel(this.prospect.id,postprospect, "/prospect").then(
      result => {
        console.log(result);
        this.getprospects();
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
   
    this.onClose()
  }


  saveprospect() {
    console.log(this.prospect)
    
    let postprospect = {
      'prospectName': this.prospect.prospectName,
      
     
    };

    this.globalService.addModel(postprospect, "/prospect").then(
      result => {
        console.log(result);
        this.getprospects();
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
   
    this.onClose();
  }

  onClose() {
    this.edit=false;
    this.save=false;
    this.bsModalRef.hide();
  }


    
}