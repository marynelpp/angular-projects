import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'hardware-cmp',
    moduleId: module.id,
    templateUrl: 'hardware.component.html'
    
})

export class HardwareComponent implements OnInit{
    ngOnInit(){
        this.getHardwares();
    }


  
    hardwareList: any;
    bsModalRef: BsModalRef;
    hardware: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
       this.hardware=[];
       
    }
    OpenHardwareModal(template: TemplateRef<any>, option, index:number) {
      this.hardware=[]
      if(option==="save"){
        this.titleModal='Create Hardware';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit Hardware';
        this.edit=true;
        console.log(this.hardwareList[index])
        this.hardware=this.hardwareList[index];
        console.log(this.hardware);
      }else
      if(option==='delete'){
        this.hardware=this.hardwareList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    getHardwares() {
        this.globalService.getModel("/hardware").then(
            result => {
              console.log(result);
              this.hardwareList = result;
            },
            err => {
              console.log(err);
              //this.loader.dismiss();
            }
          );
    }
    
    
  
    deleteHardware() {
      this.globalService.removeModel(this.hardware.id,"/hardware").then(
        result => {
          console.log(result);
          this.getHardwares();
        },
        err => {
          console.log(err);
          
          //this.loader.dismiss();
        }
      );
      
      this.onClose()
    }
  
    editHardware() {
      console.log(this.hardware)
      
      let postHardware = {
        'id': this.hardware.id,
        'hardwareName': this.hardware.hardwareName,
        
      };
  
      this.globalService.updateModel(this.hardware.id,postHardware, "/hardware").then(
        result => {
          console.log(result);
          this.getHardwares();
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
     
      this.onClose()
    }


    saveHardware() {
      console.log(this.hardware)
      
      let postHardware = {
        'hardwareName': this.hardware.hardwareName,
        
       
      };
  
      this.globalService.addModel(postHardware, "/hardware").then(
        result => {
          console.log(result);
          this.getHardwares();
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
