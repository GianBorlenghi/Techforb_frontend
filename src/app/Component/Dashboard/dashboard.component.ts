import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Alert } from 'src/app/Model/Alert';
import { Country } from 'src/app/Model/Country';
import { Plant } from 'src/app/Model/Plant';
import { Reading } from 'src/app/Model/Reading';
import { Sensor } from 'src/app/Model/Sensor';
import { SensorPlant } from 'src/app/Model/SensorPlant';
import { TotalAlert } from 'src/app/Model/TotalAlert';
import { AlertService } from 'src/app/Service/alert.service';
import { CookieServic } from 'src/app/Service/cookie.servic';
import { CountryService } from 'src/app/Service/country.service';
import { PlantService } from 'src/app/Service/plant.service';
import { SensorPlantService } from 'src/app/Service/sensor-plant.service';
import { SensorService } from 'src/app/Service/sensor.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sensor: Sensor[] = []
  plants: Plant[] = [];
  alert: String[] = [];
  read: Reading[] = []
  totalOkAlert = 0;
  totalRedAlert = 0;
  totalMediumAlert = 0;
  totalReadings = 0;
  countries: Country[] = []
  createPlantForm: FormGroup;
  editPlantForm: FormGroup;
  selectedPlant: any = {};
  disabledSensors: number = 0;
  addSensorForm: FormGroup;
  plant_select: any;
  plant_co: Plant[] = [];
  al: Alert[] = [];
  s: any[] = []
  readingsBySensor: { [key: number]: any[] } = {};
  readSensor: any[] = []
  constructor(private route:Router,private titleService:Title,private sensorPlantService: SensorPlantService, private alertService: AlertService, private cookieService: CookieServic, private router: Router, private plantService: PlantService, private sensorService: SensorService, private countryService: CountryService, private formBuilder: FormBuilder) {

    this.createPlantForm = this.formBuilder.group({
      plantName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'), Validators.minLength(3), Validators.maxLength(40)]],
      countryN: ['', [Validators.required]]
    })

    this.editPlantForm = this.formBuilder.group({
      plantName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'), Validators.minLength(3), Validators.maxLength(40)]]

    })

    this.addSensorForm = this.formBuilder.group({
      sensor: ['', Validators.required]
    })
  }

  async ngOnInit() {
    this.titleService.setTitle("Dashboard")
      this.route.navigate(['/dashboard/'])

    this.getAllPlants()
    this.getAllSensor()
    this.getAllCountries()
    this.getAllAlert()
    this.getReadSensor()

    $(document).ready(function () {
      $('.nav-container li').on('click', function () {
        $('.nav-container li').removeClass('active');
        $(this).addClass('active');
      });
    });
  }
  addPlantSubmit() {
    if (this.createPlantForm.valid && (this.createPlantForm.get('countryN')?.value !== null)) {


      const pl: Plant = {
        plant_name: this.createPlantForm.get('plantName')?.value,
        country: this.createPlantForm.get('countryN')?.value,
        alert: [""],
        medium_alert_by_plant: 0,
        created_at: '',
        readings_by_plant: 0,
        red_alert_by_plant: 0,
        sensors: [],
        ok_alert_by_plant: 0
      }

      this.plantService.createPlant(pl).subscribe(
        (response: any) => {
          console.log(response)
          location.reload()


        }, (error: any) => {
          if (error.status == 401) {
            setTimeout(() => {
              alert("Su token expiró, vuelva a iniciar sesión.");
              localStorage.clear(); this.router.navigate(['login']);
            }, 2000);
            location.reload();
          }
        })

    } else {
      alert('Campos vacíos.');
    }

    this.cookieService.setArrayInCookie("plant_co", this.plants)

  }


  openModalEdit(plant: Plant) {
    this.editPlantForm.patchValue({
      country: {
        flag_url: plant.country.flag_url,
        name: plant.country.name
      },
      id_plant: plant.id_plant,
      plant_name: plant.plant_name,
      red_alert_by_plant: plant.red_alert_by_plant,
      medium_alert_by_plant: plant.medium_alert_by_plant,
      readings_by_plant: plant.readings_by_plant
    });


    /*this.selectedPlant = {

      country: {
        flag_url: plant.country.flag_url,
        name: plant.country.name
      },
      id_plant: plant.id_plant,
      plant_name: plant.plant_name,
      red_alert_by_plant: plant.red_alert_by_plant,
      medium_alert_by_plant: plant.medium_alert_by_plant,
      readings_by_plant: plant.readings_by_plant,
    }*/
  }

  editPlantSubmit() {
    if (this.editPlantForm.valid) {

      let new_name = this.editPlantForm.get('plantName')?.value;

      this.plantService.editPlant(this.selectedPlant.id_plant, new_name).subscribe(
        (data: any) => {
          alert("Planta editada");
          location.reload();

        }
      )
    }

  }

  deletePlant(p: any) {
    let rp = confirm("¿Seguro que desea borrar la planta: " + p.plant_name + " ?");
    if (rp) {
      this.plantService.deletePlant(p.id_plant).subscribe(
        (data: any) => {
          location.reload()
        }, (error: any) => {
          console.log(error)
        }
      )
    } else {
      alert("La planta " + p.plant_name + " se mantiene.");
    }
  }

  addSensorPlant() {
    if (this.addSensorForm.get('sensor')?.value !== null) {

      const s: any = {
        plant: this.plant_select,
        sensor: this.addSensorForm.get('sensor')?.value,
        status: true
      }
      this.sensorService.createSensorInPlant(s).subscribe(
        (data: any) => {
          alert(data)
          location.reload()

        }
      )
    }

  }
  guardarId(p: any) {
    this.plant_select = p;
  }


  getAllPlants() {
    this.plantService.getAllPlants().subscribe(
      (data: any) => {
        this.plants = data;
  
        let totalReadingsGlobal = 0;

        let totalOkAlertGlobal = 0;
        let totalDisabledSensors = 0;
        
        // Recorre cada planta
        for (let i = 0; i < this.plants.length; i++) {
          const plant = this.plants[i];
  
          let totalReadings = 0;
          let redReadings = 0;
          let mediumReadings = 0;
          let okReadings = 0;
          let disabledSensors = 0;
          
          if (Array.isArray(plant.sensors)) {
            plant.sensors.forEach((sensor: any) => {
              let r_Readings=0;
              let m_Readings =0;
              let o_Readings = 0;
              if (Array.isArray(sensor.readings)) {
                totalReadings += sensor.readings.length;
                
                sensor.readings.forEach((reading: any) => {
                  if (reading.status === 'ROJA') {
                    redReadings++;
                    r_Readings++;
                  } else if (reading.status === 'MEDIA') {
                    mediumReadings++;
                    m_Readings++;
                  } else if (reading.status === 'NORMAL') {
                    okReadings++;
                    o_Readings++;
                  }
                });
               
                
              }
  
              if (!sensor.status) {
                disabledSensors++;
              }
              //necesito guardar aca una propieda de sensors, sensors.readStats. Como hago ? tengo que guardarlo por sensor
            });
          }
          plant.readings_by_plant = totalReadings;
          plant.red_alert_by_plant = redReadings;
          plant.medium_alert_by_plant = mediumReadings;
          plant.ok_alert_by_plant = okReadings;
          
          totalReadingsGlobal += totalReadings;
          totalOkAlertGlobal += okReadings;
          totalDisabledSensors += disabledSensors;
          
  
        }
  
        this.totalReadings = totalReadingsGlobal;

        this.totalOkAlert = totalOkAlertGlobal;
        this.disabledSensors = totalDisabledSensors;
        
      
  },(error: any) => {
      if (error.status == 401) {
        setTimeout(() => {
          alert("Su token expiró, vuelva a iniciar sesión.");
          this.cookieService.deleteCookie("token");
          this.cookieService.deleteCookie("id_user");
          this.router.navigate(['login']);
        }, 2000);
      }
    });
  }
  getAllSensor() {
    this.sensorService.getAllSensor().subscribe(
      (data: any) => {
        this.sensor = data;

        
      },
      (error: any) => {
        if (error.status === 401) {
          setTimeout(() => {
            alert("Su token expiró, vuelva a iniciar sesión.");
            this.cookieService.deleteCookie("token");
            this.cookieService.deleteCookie("id_user");
            this.router.navigate(['login']);
          }, 2000);
        }
      }
    );
    this.cookieService.setArrayInCookie("sensores", this.sensor);

  }




  getAllCountries() {
    this.countryService.getAllCountries().subscribe(
      (data: any) => {
        this.countries = data;
        this.cookieService.setArrayInCookie("countries", data);
      }
    );
  }

  getAllAlert() {

    this.alertService.getAllAlert().subscribe(
      (data: any) => {
        this.al = data.body
        let allNormalRead = 0;
        let allRedAlert = 0;
        let allMediumAlert = 0
        this.al.forEach(al => {
          switch (al.alert_type) {

            case 'ROJA':
              allRedAlert++;
              break;
            case 'MEDIA':
              allMediumAlert++;
              break;
          }
        })

        this.totalRedAlert = allRedAlert;
        this.totalMediumAlert = allMediumAlert;
      }
    )
  }



  getReadSensor() {
    this.sensorPlantService.getAlertBySensor().subscribe(
      (data: any) => {
        this.readSensor = data;
      }
    )
  }
}
