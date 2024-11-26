export class Country {

    public id_country?:String;
    public name:String
    public flag_url:String;

    constructor(id_country:String,name:String,flag_url:String){
        this.id_country = id_country
        this.name = name
        this.flag_url = flag_url
    }

}