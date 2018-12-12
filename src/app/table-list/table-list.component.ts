import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
	Confirmed='Confirmed';
	Packed="Packed";
	Shipped='Shipped';
	Delivered='Delivered';
	COD='Cash On Delivery';
	NB='Net Banking';
	Paytm='Paytm';
	CDC='Credit/Debit Card';
	items:item[];
	itemPost=
  		{
        "seller_username": "garvit",
        "product_title": "",
        "product_description": "",
        "product_price": 0.0,
        "product_quantity": 0.0,
        "longitude": 0,
        "latitude": 0
    	}
    transactionPost=
   	{
        "buyer_username":"anurag",
        "item_id":5,
        "status": "CNF",
        "paymentOption": "COD"
    }
   	BuyerObj=
   	{
	    "id": 0,
	    "buyer": {
	        "username": "",
	        "first_name": "",
	        "last_name": "",
	        "email": "",
	        "mobile_no": "",
	        "avatar": "/media/default_avatar.png",
	        "is_farmer": false
	    },
	    "status": "",
	    "paymentOption": "",
	    "created_on": ""
   	}
  constructor(private dataService:DataService) 
  {
  	  		this.dataService.getItems().subscribe((res)=>{
		     	console.log(res);
		     	this.items=res;
		    }); 
  }
showNotification(from, align,id){
		this.dataService.getBuyer(id).subscribe((res)=>{
		     	console.log(res);
		     	this.BuyerObj=res;
		     	console.log("this.BuyerObj",this.BuyerObj);
		     	console.log('http://35.200.250.64:8889'+this.BuyerObj.buyer.avatar)
		     
      const type = ['info','success','warning','danger','primary'];

      // const color = Math.floor((Math.random() * 5) );
		const color = 1 ;
      $.notify({
          icon: "",
          message: this.BuyerObj.buyer.username+'<br>' + this.BuyerObj.paymentOption+'<br>' + this.BuyerObj.status+'<br>' + this.BuyerObj.created_on.split('T')[1].split('.')[0]+'<br>' + this.BuyerObj.created_on.split('T')[0]

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: 
            '<div class="col-md-6">'+
              '<div class="card card-plain">'+
              		'<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                  '<div class="card-header card-header-success">'+
                      '<h6 class="card-title mt-0"> Buyer Details</h6>'+
                  '</div>'+
                  '<div class="card-body">'+
                      '<div class="table">'+
                          '<table class="table table-hover">'+
                              '<thead class="">'+
                              		'<th>Profile Image</th>'+
                                  '<th>Buyer</th>'+
                                  '<th>Payment Option</th>'+
                                  '<th>Delivery Status</th>'+
                                  '<th>Transaction Date</th>'+
                                  '<th>Transaction Time</th>'+
                              '</thead>'+
                              '<tbody>'+
                                  '<tr>'+
                                  		'<td>'+`<img src="http://35.200.250.64:8889/media/default_avatar.png" height=70px;>` +'</td>'+
										'<td>'+this.BuyerObj.buyer.username +'</td>'+
										'<td>'+this.BuyerObj.paymentOption+'</td>'+
										'<td>'+this.BuyerObj.status+'</td>'+
										'<td>'+this.BuyerObj.created_on.split('T')[0]+'</td>'+
										'<td>'+this.BuyerObj.created_on.split('T')[1].split('.')[0]+'</td>'+
                                  '</tr>'+
                                '</tbody>'  
      });
   });
  }
  showNotification2(from, align,id)
  {
      const type = ['info','success','warning','danger','primary'];

      // const color = Math.floor((Math.random() * 5) );
		const color = 1 ;
      $.notify({
          icon: "",
          message: this.BuyerObj.buyer.username+'<br>' + this.BuyerObj.paymentOption+'<br>' + this.BuyerObj.status+'<br>' + this.BuyerObj.created_on.split('T')[1].split('.')[0]+'<br>' + this.BuyerObj.created_on.split('T')[0]

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: 
            '<div class="col-md-6">'+
              '<div class="card card-plain">'+
              		'<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                  '<div class="card-header card-header-success">'+
                      '<h6 class="card-title mt-0"> Buyer Details</h6>'+
                  '</div>'+
                  '<div class="card-body">'+
                      '<div class="table">'+
                          '<table class="table table-hover">'+
                              '<thead class="">'+
                              		'<th>Profile Image</th>'+
                                  '<th>Buyer</th>'+
                                  '<th>Payment Option</th>'+
                                  '<th>Delivery Status</th>'+
                                  '<th>Transaction Date</th>'+
                                  '<th>Transaction Time</th>'+
                              '</thead>'+
                              '<tbody>'+
                                  '<tr>'+
                                  		'<td>'+`<img src="http://35.200.250.64:8889/media/default_avatar.png" height=70px;>` +'</td>'+
										'<td>'+this.BuyerObj.buyer.username +'</td>'+
										'<td>'+this.BuyerObj.paymentOption+'</td>'+
										'<td>'+this.BuyerObj.status+'</td>'+
										'<td>'+this.BuyerObj.created_on.split('T')[0]+'</td>'+
										'<td>'+this.BuyerObj.created_on.split('T')[1].split('.')[0]+'</td>'+
                                  '</tr>'+
                                '</tbody>'  
      });
  }
  ngOnInit() {
  }
  addItem(product_title, product_description, product_price, product_quantity)
  {
  	this.itemPost.product_title=product_title;
  	this.itemPost.product_description=product_description;
  	this.itemPost.product_price=product_price;
  	this.itemPost.product_quantity=product_quantity;
  	console.log(this.itemPost);
  	this.dataService.postItem(this.itemPost).subscribe((res)=>{
		     	console.log(res);
		    }); 

  }
  addTransaction(buyer, Commodity, status, payment_option)
  {
  	console.log(buyer);
  	console.log(Commodity);
  	console.log(status);
  	console.log(payment_option);
  	this.transactionPost.buyer_username=buyer;
  	this.transactionPost.item_id=Commodity;
  	this.transactionPost.status=status;
  	this.transactionPost.paymentOption=payment_option;
		this.dataService.postTranscation(this.transactionPost).subscribe((res)=>{
		     	console.log(res);
		    }); 
  }


}
interface item
  {
  	  "id":string,
      "product_title": string,
      "product_description": string,
      "product_price": string,
      "product_quantity": string,
      "itemImage": string,
      "sold": string,
      "created_on": boolean
  }

