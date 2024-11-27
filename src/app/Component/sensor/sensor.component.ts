import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Plant } from 'src/app/Model/Plant';
import { Sensor } from 'src/app/Model/Sensor';
import { SensorDTO } from 'src/app/Model/SensorDTO';
import { SensorService } from 'src/app/Service/sensor.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensor:Sensor[] = []
  selectedSensor:any = {};
  editSensorForm:FormGroup;
  createSensorForm:FormGroup;
  constructor(private titleService:Title,private route:Router,private sensorService:SensorService,private formBuilder:FormBuilder) { 
this.editSensorForm = this.formBuilder.group({
  sensorName:['',[Validators.required,Validators.maxLength(25),Validators.minLength(3),Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]],
  normalValue:['',[Validators.required,Validators.pattern('^[+-]?[0-9]+$')]],
  criticalValue:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
  id_sensor:['']
})
this.createSensorForm = this.formBuilder.group({
  sensorN:['',[Validators.required,Validators.maxLength(25),Validators.minLength(3),Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]],
  normalV:['',[Validators.required,Validators.pattern('^[+-]?[0-9]+$')]],
  criticalV:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
})

  }


  ngOnInit(): void {
    this.titleService.setTitle("Sensores")
    this.route.navigate(['/dashboard/sensor'])

    this.loadSensors();
    
    function formatDate(rawDate:any) {
      const dateParts = rawDate.split(',').map(Number);
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]);
      return date.toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }


  }
  
  openModalEdit(sensor:SensorDTO){


  this.editSensorForm.patchValue({
    criticalValue: sensor.critical_value,
    id_sensor:sensor.id_sensor,
    sensorName : sensor.type,
    normalValue:sensor.normal_value,
  });

  this.editSensorForm.get('id_sensor')?.disable();

}

editSensorSubmit(){
if(this.editSensorForm.valid){


  
  const s: SensorDTO = {
    type: this.editSensorForm.get('sensorName')?.value,
    normal_value: this.editSensorForm.get('normalValue')?.value,
    critical_value: this.editSensorForm.get('criticalValue')?.value,
    id_sensor: this.editSensorForm.get('id_sensor')?.value,

}

this.sensorService.updateSensor(s).subscribe(
  (response:any)=>{
    alert(response)
    this.loadSensors();
  }
)
}
}

createSensorSubmit(){
  const s: SensorDTO = {
    type: this.createSensorForm.get('sensorN')?.value,
    normal_value: this.createSensorForm.get('normalV')?.value,
    critical_value: this.createSensorForm.get('criticalV')?.value
};

this.sensorService.createSensor(s).subscribe(
(data:any)=>{
alert("Sensor creado correctamente.")
location.reload()
},(error:any)=>{
  alert(error);
}
)

}

deleteSensor(s:any){
  let rp = confirm("¿Seguro que desea borrar el sensor: "+s.type+" ?");
  if(rp){
    this.sensorService.deleteSensor(s.id_sensor).subscribe(
      (data:any)=>{
        this.loadSensors()
        alert("Sensor "+s.type+" eliminado correctamente.");
      },(error:any)=>{
        console.log(error.error.message)
      }
    )
  }else{
    alert("El sensor "+s.type + "se mantiene");
  }
}


loadSensors(){
this.sensorService.getAllSensor().subscribe((data: any) => {
  this.sensor = data;
  console.log(data)

});
}
}

