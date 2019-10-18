
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
    { path: '/level',         title: 'Level',        icon:'nc-tile-56',    class: '' },
    { path: '/technology',         title: 'Techonology',        icon:'nc-tile-56',    class: '' },
    { path: '/activity',         title: 'Activity',        icon:'nc-tile-56',    class: '' },
  
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
    countries;
    selectedCountry;
    city;
    selectedCity;

    
  
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.countries = [
            { id: 1, name: "Mexico"},
            { id: 2, name: "USA" },
            { id: 3, name: "China" },
            { id: 4, name: "Japan" }
        ];
        
        this.selectedCountry = [{
            id: 1,
            name: "Mexico"
        }];

        this.city = [
            { id: 1, name: "Siquisique"},
            { id: 2, name: "Barquisimeto" },
            { id: 3, name: "Acarigua" },
        ];
        
        this.selectedCity = [{
            id: 2,
            name: "Barquisimeto"
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