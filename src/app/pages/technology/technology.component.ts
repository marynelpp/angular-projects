import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'technology-cmp',
    moduleId: module.id,
    templateUrl: 'technology.component.html'
    
})

export class TechnologyComponent implements OnInit{
    ngOnInit(){
        this.getTechnologys();
    }


  
    technologyList: any;
    bsModalRef: BsModalRef;
    technology: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
       this.technology=[];
       
    }
    OpenTechnologyModal(template: TemplateRef<any>, option, index:number) {
      this.technology=[]
      if(option==="save"){
        this.titleModal='Create Technology';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit Technology';
        this.edit=true;
        console.log(this.technologyList[index])
        this.technology=this.technologyList[index];
        console.log(this.technology);
      }else
      if(option==='delete'){
        this.technology=this.technologyList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    getTechnologys() {
        this.globalService.getModel("/technology").then(
            result => {
              console.log(result);
              this.technologyList = result;
            },
            err => {
              console.log(err);
            }
          );
    }
    
    
  
    deleteTechnology() {
      this.globalService.removeModel(this.technology.techId,"/technology").then(
        result => {
          console.log(result);
          this.getTechnologys();
        },
        err => {
          console.log(err);
          
        }
      );
      
      this.onClose()
    }
  
    editTechnology() {
      console.log(this.technology)
      
      let postTechnology = {
        'techId': this.technology.techId,
        'techName': this.technology.techName,
        
      };
  
      this.globalService.updateModel(this.technology.techId,postTechnology, "/technology").then(
        result => {
          console.log(result);
          this.getTechnologys();
        },
        err => {
          console.log(err);
        }
      );
     
      this.onClose()
    }


    saveTechnology() {
      console.log(this.technology)
      
      let postTechnology = {
        'techName': this.technology.techName,
        
       
      };
  
      this.globalService.addModel(postTechnology, "/technology").then(
        result => {
          console.log(result);
          this.getTechnologys();
        },
        err => {
          console.log(err);
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
