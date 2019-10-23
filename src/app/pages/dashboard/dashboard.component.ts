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
      this.getprospects();
      this.chartColor = "#FFFFFF";

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
  

    getprospects() {
      console.log("algo");
      this.globalService.getModel("/5db068572f00004ae4c13be5").then(
        
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
      'prospect_id': this.prospect.prospect_id,
      'prospect_name': this.prospect.prospect_name,
      'prospect_birthday': this.prospect.prospect_birthday,
      'city_id': this.prospect.city_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_cv': this.prospect.prospect_address,
      'prospect_photo': this.prospect.prospect_photo,
      'prospect_link': this.prospect.prospect_link,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
     
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
      'prospect_id': this.prospect.prospect_id,
      'prospect_name': this.prospect.prospect_name,
      'prospect_birthday': this.prospect.prospect_birthday,
      'city_id': this.prospect.city_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_cv': this.prospect.prospect_address,
      'prospect_photo': this.prospect.prospect_photo,
      'prospect_link': this.prospect.prospect_link,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
      
     
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