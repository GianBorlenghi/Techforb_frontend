import { Alert } from "./Alert";
import { Reading } from "./Reading";
import { Sensor } from "./Sensor";


export class SensorPlant{
    public id_sensor_plant:number;
    public status:boolean;
    public alert:Alert[];
    public readings:Reading[];
    readingStats?: {
        redCount: number;
        mediumCount: number;
        okCount: number;
      };
      sensor?: Sensor;
   constructor(id_sensor_plant:number,status:boolean,alert:Alert[],readings:Reading[],sensor:Sensor){
    this.id_sensor_plant = id_sensor_plant
    this.status = status
    this.alert = alert;
    this.readings = readings;
    this.sensor=sensor
   }
}