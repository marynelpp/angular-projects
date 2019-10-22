

import { Component, OnInit, AfterViewInit } from '@angular/core';
import noUiSlider from "nouislider";
import { SliderType } from "igniteui-angular";


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    { path: '/dashboard',          title: 'Dashboard',      icon:'nc-single-02',  class: '' },
    { path: '/user',          title: 'User',      icon:'nc-single-02',  class: '' },
  
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public sliderType = SliderType;
    public priceRange: PriceRange = new PriceRange(200, 800);
    public exp: Exp = new Exp(200, 800);
    public lexp: Lexp = new Lexp(200, 800);
    public age: Age = new Age(200, 800);
    software;
    selectedSoftware;


    
  
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.software = [
            { id: 1, name: ".Net"},
            { id: 2, name: "Postman" },
       
        ];
        
        this.selectedSoftware = [{
            id: 1,
            name: ".Net"
        }];

      

        
    }
}
class PriceRange {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}

class Exp {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}

class Lexp {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}

class Age {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}