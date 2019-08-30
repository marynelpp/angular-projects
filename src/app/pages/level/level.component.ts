import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'level-cmp',
    moduleId: module.id,
    templateUrl: 'level.component.html'
    
})

export class LevelComponent implements OnInit{
    ngOnInit(){
        this.getLevels();
    }


  
    levelList: any;
    bsModalRef: BsModalRef;
    level: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
       this.level=[];
       
    }
    OpenLevelModal(template: TemplateRef<any>, option, index:number) {
      this.level=[]
      if(option==="save"){
        this.titleModal='Create Level';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit Level';
        this.edit=true;
        console.log(this.levelList[index])
        this.level=this.levelList[index];
        console.log(this.level);
      }else
      if(option==='delete'){
        this.level=this.levelList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    getLevels() {
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
    
    
  
    deleteLevel() {
      this.globalService.removeModel(this.level.levelId,"/level").then(
        result => {
          console.log(result);
          this.getLevels();
        },
        err => {
          console.log(err);
          
          //this.loader.dismiss();
        }
      );
      
      this.onClose()
    }
  
    editLevel() {
      console.log(this.level)
      
      let postLevel = {
        'levelId': this.level.id,
        'levelName': this.level.levelName,
        
      };
  
      this.globalService.updateModel(this.level.levelId,postLevel, "/level").then(
        result => {
          console.log(result);
          this.getLevels();
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
     
      this.onClose()
    }


    saveLevel() {
      console.log(this.level)
      
      let postLevel = {
        'levelName': this.level.levelName,
        
       
      };
  
      this.globalService.addModel(postLevel, "/level").then(
        result => {
          console.log(result);
          this.getLevels();
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

