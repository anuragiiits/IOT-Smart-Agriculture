import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/farms', title: 'Dashboard',  icon:'dashboard', class: '' },
    { path: '/maps', title: 'Add Farm',  icon:'content_paste', class: '' },
    { path: '/table-list', title: 'Sell Commodities',  icon:'bubble_chart', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userP:userProfile;


  constructor(private dataService:DataService) 
  { 
    this.userP=
    {
    "username": "garvit",
    "first_name": "Garvit",
    "last_name": "",
    "email": "garvit.k16@iiits.in",
    "mobile_no": "7014156060",
    "avatar": "/media/Profile/garvit_SJpzHNs",
    "is_farmer": true
    };
    console.log("starting dataService...");
    this.dataService.getUsers().subscribe((user)=>{
        console.log(user);
        this.userP=user
        console.log(this.userP.username)
      });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

interface userProfile
  {
      "username": string,
      "first_name": string,
      "last_name": string,
      "email": string,
      "mobile_no": string,
      "avatar": string,
      "is_farmer": boolean
  }
