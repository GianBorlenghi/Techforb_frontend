export class TotalAlert{
    public totalOkAlert:number = 0;
    public totalRedAlert:number = 0;
    public totalMediumAlert:number = 0;

    constructor(totalOkAlert:number,totalRedAlert:number,totalMediumAlert:number){
        this.totalOkAlert = totalOkAlert;
        this.totalRedAlert = totalRedAlert
        this.totalMediumAlert = totalMediumAlert
    }


}