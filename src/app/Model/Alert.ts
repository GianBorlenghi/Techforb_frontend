import { SensorPlant } from "./SensorPlant";

export class Alert{
    public id_alert?:String
    public alert_type:String
    public alert_at:String
    public alert_status:String;
    public sensor:SensorPlant;

    constructor(id_alert:String,alert_type:String,alert_at:String,alert_status:String,sensor:SensorPlant){
        this.id_alert = id_alert;
        this.alert_type = alert_type;
        this.alert_at = alert_at;
        this.alert_status = alert_status;
        this.sensor= sensor;
    }
}