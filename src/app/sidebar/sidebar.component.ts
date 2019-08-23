import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
   
    { path: '/user',          title: 'User',      icon:'nc-single-02',  class: '' },
    { path: '/hardware',         title: 'Hardware',        icon:'nc-tile-56',    class: '' },
    { path: '/software',         title: 'Software',        icon:'nc-tile-56',    class: '' },
    { path: '/assignment',         title: 'Assignments',        icon:'nc-tile-56',    class: '' },
  
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
