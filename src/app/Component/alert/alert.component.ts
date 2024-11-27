import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Alert } from 'src/app/Model/Alert';
import { Plant } from 'src/app/Model/Plant';
import { Sensor } from 'src/app/Model/Sensor';
import { AlertService } from 'src/app/Service/alert.service';
import { CookieServic } from 'src/app/Service/cookie.servic';

import { PlantService } from 'src/app/Service/plant.service';
import { SensorService } from 'src/app/Service/sensor.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private route:Router,private titleService:Title,private cookieService:CookieServic,private alertService:AlertService,private plantService:PlantService,private sensorService:SensorService) { }
  
  
  plant:any[] = [];
  alert:any[] = []
  sen:Sensor []=[];
  p:any []=[]
  id:number=0;
  ngOnInit(): void {
    this.route.navigate(['/dashboard/alertas'])
    this.titleService.setTitle("Alerts");
    this.findSensor()
    this.findAllPlants();
  }

  findSensor(){
    this.sensorService.getAllSensor().subscribe(
      (data:any)=>{
        this.sen = data;

      }
    )
  }
  findAllPlants() {
    this.p = this.cookieService.getArrayFromCookie("sensores");
  
    this.plantService.getAllPlants().subscribe(
      (data: any) => {
        this.plant = data; 
        
        for (let plant of this.plant) {
          for (let sensor of plant.sensors) {
            let s1=0;
            this.cookieService.getArrayFromCookie("sensores").forEach(s=>{
              if(s.id_sensor == sensor.id){
              }
            })
            for (let alert of sensor.alert) {
              this.alert.push({
                alert: alert,
                id_alert: alert.id_alert,
                plantName: plant.plant_name,
                plantId: plant.id_plant,
                alert_type: alert.alert_type,
                alert_at: alert.alert_at,
                
              });
              
            }
          }
        }
      }
    );
  }

  resolveAlert(ale:Alert){
    const al:Alert={
      id_alert:ale.id_alert,
      alert_status: "RESUELTA",
      alert_type :ale.alert_type,
      sensor:ale.sensor,
      alert_at:ale.alert_at
    }
    this.alertService.updateAlert(ale.id_alert,al).subscribe(
      (data:any)=>{
        alert("Alerta con id "+ale.id_alert + " resuelta");
        this.findAllPlants();
      }
    )
  }
  
}
