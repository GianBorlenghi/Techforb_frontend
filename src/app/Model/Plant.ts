import { Country } from "./Country";
import { SensorPlant } from "./SensorPlant";

export class Plant {

    public id_plant?: String;
    public plant_name: String;
    public created_at: String;
    public country: Country;
    public sensors:SensorPlant[];
    public readings_by_plant:number = 0//[];
    public medium_alert_by_plant:number= 0 //[];
    public red_alert_by_plant:number= 0//[];
    public alert:String[] = []
    public ok_alert_by_plant:number=0;

    constructor(ok_alert_by_plant:number,id_plant:String,plant_name:String,created_at:String,country:Country,sensors:SensorPlant[],readings_by_plant:number,medium_alert_by_plant:number,red_alert_by_plant:number,alert:String[]){

        this.id_plant = id_plant
        this.plant_name = plant_name
        this.created_at= created_at
        this.country = country
        this.sensors = sensors;
        this.readings_by_plant = readings_by_plant
        this.medium_alert_by_plant = medium_alert_by_plant
        this.red_alert_by_plant = red_alert_by_plant
        this.alert = alert
        this.ok_alert_by_plant = ok_alert_by_plant
    }

}