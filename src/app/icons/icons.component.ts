import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
	farms:farm[];
  userP:userProfile;
	img:string
  	constructor(private dataService:DataService, private router:Router) {
  		this.dataService.getUsers().subscribe((user)=>{
     	console.log(user);
      this.userP=user
    });

     this.dataService.getFarm().subscribe((farms)=>{
        console.log(farms);
        this.farms=farms
        console.log("http://127.0.0.1:8000"+farms[2].farmImage);
        this.img="http://127.0.0.1:8000"+farms[2].farmImage
        // this.userP=farms
     });


   }

  ngOnInit() {
  }
  goToCrops(farm_id)
  {
  	console.log("farm_id",farm_id)
  	this.router.navigate(['/dashboard',farm_id])

  }
  addFarm(farm_name,about,latitude,longitude)
  {
    console.log(
    {
      "farmer_username":this.userP.username,
      "farm_name":farm_name,
      "about":about,
      "longitude":longitude,
      "latitude":latitude
    })
  }

}

interface farm
  {
  		"id":string,
    	"farm_name": string,
        "about": string,
        "farmImage": string,
        "longitude": string,
        "latitude": string,
        "created_on": string
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
