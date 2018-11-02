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
}
