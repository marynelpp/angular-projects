import { Component, OnInit, TemplateRef, NgModule } from '@angular/core';
import { GlobalService } from "../providers/global.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {MainPipe} from './pipe.module';
@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    
})

export class DashboardComponent implements OnInit{
  MainPipe = {name:''}
  
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
  country:any;
  countryList :any;
  city:any;
  cityList:any;
  titleList: any;
  title: any;
  titles: any;
  bsModalRef: BsModalRef;
  idprospect:string;
  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;
  
  software: any;
  softwares: any;
  softwareList: any;

  UserList :any;

 

  prospect;
  selectedsoftware;

    ngOnInit(){
      
      this.getsoftware();
      this.getprospects();
      this.gettitle();
      this.getcountry();
      this.getcity(); 
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

  

    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
      this.UserList = [];
      this.titleList = [];
      this.softwareList = [];
      this.software = [];
      this.softwares= [];
      
    }
    loadPage(item){
      // console.log(item);
      //localStorage.setItem("prospect", item);
      
    }

    OpenProspectModal(template: TemplateRef<any>, option, index:number) {
      this.prospect=[]
      this.software = [];
      this.title= [];
      if(option==="save"){
        this.titleModal='Create prospect';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit prospect';
        this.edit=true;
        console.log(this.prospectList[index])
        this.prospect=this.prospectList[index];
        console.log(this.prospect);
      }else
      if(option==='delete'){
        this.prospect=this.prospectList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
      
    }
    showCountry() {
      console.log(this.country);
      this.globalService.getModel("/country/" + this.country.country_id).then(
        result => {
          console.log(result);
          this.countryList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
  }

  showCity() {
    console.log(this.country);
    this.globalService.getModel("/city/" + this.country.city_id).then(
      result => {
        console.log(result);
        this.cityList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
}

    showTitle() {
      console.log(this.title);
      this.globalService.getModel("/title/" + this.country.title_id).then(
        result => {
          console.log(result);
          this.titleList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
    }

    getprospects() {
    
      this.globalService.getModel("/Prospect").then(
        
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

  getcity() {
    
    this.globalService.getModel("/city").then(
      
        result => {
          console.log(result);
          this.cityList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
}



  getcountry() {
    
    this.globalService.getModel("/country").then(
      
        result => {
          console.log(result);
          this.countryList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
}

  gettitle() {
    this.globalService.getModel("/title").then(
      
      result => {
        console.log(result);
        this.titleList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
}

getsoftware() {
  this.globalService.getModel("/software").then(
      result => {
        console.log(result);
        this.softwareList = result;
        this.softwareList.map(item=>{
          this.software.push({ id: item.software_id, name: item.software_name})
        })
      },
      err => {
        console.log(err);
      }
    );
}
  deleteprospect() {
    this.globalService.removeModel(this.prospect.prospect_id,"/Prospect").then(
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
      'prospect_lastname': this.prospect.prospect_lastname,
      'prospect_birthday': this.prospect.prospect_birthday,
      'prospect_phonenumber': this.prospect.prospect_phonenumber,
      'city_id': this.prospect.city_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_cv': this.prospect.prospect_address,
      'prospect_photo': this.prospect.prospect_photo,
      'prospect_link': this.prospect.prospect_link,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
     
    };

    this.globalService.updateModel(this.prospect.id,postprospect, "/Prospect").then(
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
      'prospect_lastname': this.prospect.prospect_lastname,
      'prospect_birthday': this.prospect.prospect_birthday,
      'city_id': this.prospect.city_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_phonenumber': this.prospect.prospect_phonenumber,
      'prospect_cv':  this.prospect.prospect_cv,
      'prospect_photo':  this.prospect.prospect_photo,
      'prospect_link': this.prospect.prospect_link,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
    };

    this.globalService.addModel(postprospect, "/Prospect").then(
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

  prospectfilter() {
   console.log(JSON.stringify(localStorage.getItem('soft')))
   
    let postprospect = {
      "prospect_id": "",
      "ageMin": "",
      "ageMax": null,
      "salaryMin": null,
      "salaryMax": null,
      "expierenceLevel": null,
      "yearsExpierenceMin": null,
      "yearsExpierenceMax": null,
      "software_id": null
    };

    this.globalService.addModel(postprospect, "/prospect/filter").then(
      result => {
        console.log(result);
        return result;
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