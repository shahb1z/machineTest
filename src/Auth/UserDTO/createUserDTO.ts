import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";
import { isEmpty } from "rxjs";



 export class createUserDTO{

username:string;
password:string;
email:string;
mobile:number;
}


