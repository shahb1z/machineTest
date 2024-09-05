import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/userentity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  
  
  constructor(@InjectRepository(User) private userRepo:Repository<User>,
  private readonly jwtService:JwtService,

               ){
               }

               async generateJwt(user:any) {
                  const payload ={username:user.email, sub:user.id}
                  const token=await this.jwtService.sign(payload);
                   return {
                     "message":"TOken generated successfylly",
                     "Token":token
                   } 
                   }
                 
               




async getUser(email:string){
   console.log(email);
   const user=await this.userRepo.findOne({where:{email}});
   return user;
}

validateUser(payload:any){
   return {email:payload.sub , id:payload.id}

}





}