export class SensorDTO{
    public type:String;
    public critical_value:String;
    public normal_value:String;
    public id_sensor?:String
    constructor(type:String,critical_value:String,normal_value:String,id_sensor:String){
        this.id_sensor = id_sensor;
        this.type = type;
        this.critical_value = critical_value;
        this.normal_value = normal_value
    }
}