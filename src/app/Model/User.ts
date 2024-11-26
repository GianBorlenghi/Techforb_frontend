export class User {

    id_user?: number;
    city : string;
    date_of_birth?: Date;
    name:string;
    password:string;
    surname:string;
    province:string;
    username?:string
    constructor (
        city:string,date_of_birth:Date,username:string,name:string,password:string,surname:string,province:string
    ){
        this.city = city;
        this.date_of_birth = date_of_birth;
        this.name = name;
        this.password = password;
        this.surname = surname;
        this.province = province;
        this.username = username;
    }


}