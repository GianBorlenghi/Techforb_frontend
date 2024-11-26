import { Plant } from "./Plant";
import { Reading } from "./Reading";

export class Sensor {

    public id_sensor:String
    public type:String;
    public critical_value:String;
    public normal_value:String;
    public last_modification?:string;
    public readings:Reading []=[]
    public medium_alert_by_sensor:number = 0;//:number[]=[];
    public red_alert_by_sensor:number = 0//:number[]=[];
    public normal_alert_by_sensor:number = 0//:number[]=[];
    public plant?:Plant;
    public status:boolean;
    readingStats?: {
        red: number;
        medium: number;
        normal: number;
      }
    constructor(id_sensor:String,type:String,critical_value:String,normal_value:String,last_modification:string
        ,medium_alert_by_sensor:number,red_alert_by_sensor:number,readings:Reading[] = [],normal_alert_by_sensor:number,
        plant:Plant,status:boolean
    ){
        this.id_sensor = id_sensor;
        this.type = type;
        this.critical_value = critical_value;
        this.normal_value= normal_value;
        this.last_modification = last_modification;
        this.readings = readings
        this.medium_alert_by_sensor = medium_alert_by_sensor
        this.red_alert_by_sensor = red_alert_by_sensor
        this.normal_alert_by_sensor = normal_alert_by_sensor
        this.plant=plant
        this.status = status
    }
    }

