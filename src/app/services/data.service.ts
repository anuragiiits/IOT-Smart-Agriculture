import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {

  	constructor(public http:Http) { }

	getUsers(){
		return this.http.get('http://127.0.0.1:8000/userauth/?username=garvit').map(res=>res.json());
	}
	getFarm(){
		return this.http.get('http://127.0.0.1:8000/farm/?username=garvit').map(res=>res.json());
	}
	getCrops(farm_id){
		return this.http.get('http://127.0.0.1:8000/crop/?farm_id='+farm_id).map(res=>res.json());
	}
	getSensors(crop_id){
		return this.http.get('http://127.0.0.1:8000/sensor/?crop_id='+crop_id).map(res=>res.json());
	}
	getWeatherData(){
		return this.http.get('http://api.openweathermap.org/data/2.5/forecast?lat=13.553271&lon=80.018179&units=metric&APPID=e372629b1d097d7fe3fb3cd87dcd3f6b').map(res=>res.json());
	}
}
