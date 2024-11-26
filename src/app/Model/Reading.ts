import { SensorPlant } from "./SensorPlant";

export class Reading{
    public id_reading?:number;
    public reading_value:number;
    public timeStamp:String;
    public status:String;
    public sensor_r:SensorPlant;
    

    constructor(id_reading:number,reading_value:number,timeStamp:String,status:String,sensor_r:SensorPlant){
        this.id_reading = id_reading
        this.reading_value = reading_value
        this.timeStamp = timeStamp
        this.status = status
        this.sensor_r = sensor_r
    }
}