import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Plant } from 'src/app/Model/Plant';
import { Reading } from 'src/app/Model/Reading';
import { SensorPlant } from 'src/app/Model/SensorPlant';
import { CookieServic } from 'src/app/Service/cookie.servic';
import { PlantService } from 'src/app/Service/plant.service';
import { ReadingService } from 'src/app/Service/reading.service';
import { SensorPlantService } from 'src/app/Service/sensor-plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {
  plants:Plant[] = []
  sensors:any[] = [];
  readings:Reading[] =[]
  redReading = 0;
  mediumReading = 0;
  okReading = 0;
  constructor(private route:Router,private titleService:Title,private readService:ReadingService,private router:Router,private plantService:PlantService,private cookieService:CookieServic,private sensorPlantService:SensorPlantService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Plants")
    this.route.navigate(['/dashboard/plantas'])

this.getAllPlants();
this.getAllSensorPlant();    
}


getAllPlants(){
this.plantService.getAllPlants().subscribe(
  (data:any)=>{
    this.plants = data;
    console.log(this.plants)
  }
)
}
getAllSensorPlant(){
  this.sensorPlantService.getAllSensorPlant().subscribe(
    (data:any)=>{ 
    this.sensors = data;
    },(error: any) => {
      if (error.status === 401) {
        setTimeout(() => {
          alert("Su token expiró, vuelva a iniciar sesión.");
          this.cookieService.deleteCookie("token");
          this.cookieService.deleteCookie("id_user")
          this.router.navigate(['login']);
        }, 2000);
      }
      }
    )
}

getSensorById(id: any) {
  for (let i = 0; i < this.plants.length; i++) {
    for (let k = 0; k < this.plants[i].sensors.length; k++) {
      if (this.plants[i].sensors[k].id_sensor_plant == id) {
        return this.plants[i].plant_name 
      }
    }
  }
  return null;
}



seeReads(id:any){
  for (let plant of this.plants) {
    for (let sensor of plant.sensors) {
        if (sensor.id_sensor_plant === id) {
          
          this.readings = sensor.readings
          
        }
      
    }
  }
      

}
enableDisabled(s:SensorPlant){
  s.status = !s.status
  this.sensorPlantService.enableDisableSensor(s).subscribe(
    (data:any)=>{
      this.getAllPlants();
      this.getAllSensorPlant();
    }
  )
}
generateRandomReading(){
  $('#btnLectura').prop("disabled",true);
  this.readService.generateRandomRead().subscribe(
    (data:any)=>{
      alert("Lectura generada");
      $('#btnLectura').prop("disabled",false);

    }
  )
}
  }
