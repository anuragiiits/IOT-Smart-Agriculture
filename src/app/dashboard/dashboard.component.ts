import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {DataService} from '../services/data.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  farm_id:string;
  crop_id:string;
  crops:crop[];
  sensors:sensor[];
  weatherApiData:weatherApiData[];
  constructor(private dataService:DataService, private router:Router, private activatedRouter:ActivatedRoute ) 
  {
    console.log("starting dataService...")

    this.activatedRouter.params.subscribe(params=>{
      this.farm_id=params['farm_id']
      console.log("farm_id",this.farm_id)
    })
    this.dataService.getUsers().subscribe((users)=>{
      console.log(users);
    });

    //  this.dataService.getFarm().subscribe((farms)=>{
    //     console.log(farms);
    //     // this.userP=farms
    //  });
     this.dataService.getCrops(this.farm_id).subscribe((crops)=>{
        console.log(crops);
        this.crops=crops

        this.crop_id = crops[0].id
        for (var i = 0; i < this.crops.length; ++i) {
        }
        console.log("crops",this.crops);
     });

   }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }
  WeatherData()
  {
      this.dataService.getWeatherData().subscribe((data)=>{
        console.log(data);
        this.weatherApiData=data.list
        console.log("this.weatherApiData",this.weatherApiData)
      });
  }
  cropSensors(crop_id)
  {
    this.crop_id=crop_id
    console.log(crop_id)
    this.dataService.getSensors(crop_id).subscribe((sensors)=>{
        this.sensors=sensors;
        for(var i = 0; i < this.sensors.length; ++i) {
          if(sensors[i].sensor_type=="Water Level")
          {
            sensors[i].color="card-header-info";
            sensors[i].icon="https://png.pngtree.com/svg/20170828/water_tank_174464.png";
          }
          else if(sensors[i].sensor_type=="Turbidity")
          {
            sensors[i].color="card-header-muted";
            sensors[i].icon="https://png.pngtree.com/svg/20170725/turbidity_629720.png";
          }
          else if(sensors[i].sensor_type=="Temperature")
          {
            sensors[i].color="card-header-danger";
            sensors[i].icon="https://cdn3.iconfinder.com/data/icons/weather-1-8/128/Thermometer-Wheather-Forecast-Temp-Temperature-Climate-512.png";
          }
          else if(sensors[i].sensor_type=="Soil Moisture")
          {
            sensors[i].color="card-header-success";
            sensors[i].icon="https://png.pngtree.com/svg/20170914/sk_soil_moisture_yue_yue_630637.png";
          }
          else if(sensors[i].sensor_type=="Humidity")
          {
            sensors[i].color="card-header-primary";
            sensors[i].icon="https://cdn2.iconfinder.com/data/icons/network-sensors/201/humidity-512.png";
          }
          else if(sensors[i].sensor_type=="Actuator")
          {
            sensors[i].color="card-header-warning";
            sensors[i].icon="https://png.pngtree.com/svg/20170413/cooling_pump_561545.png";
          }
          
          console.log(i,sensors[i]);
        }
     });
   }

}

interface crop
  {
        "id":string,
        "crop_type": string,
        "longitude": string,
        "latitude": string,
        "created_on": string,
  }
 interface sensor
 {
        "id":string,
        "sensor_type": string,
        "longitude": string,
        "latitude": string,
        "created_on": string,
        "color":string,
        "icon":string
 }
 interface main
 {
    "temp": string,
    "temp_min": string,
    "temp_max": string,
    "pressure": string,
    "sea_level": string,
    "grnd_level": string,
    "humidity": string,
    "temp_kf": string
}
interface wind 
{
    "speed": string,
    "deg": string
}
interface weather
{
    "id": string,
    "main": string,
    "description": string,
    "icon":string
}

interface weatherApiData
{
    "dt_txt":string,
    "main":main,
    "wind":wind,
    "weather":weather[]
}
