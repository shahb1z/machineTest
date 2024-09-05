import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDTO } from "./UserDTO/createUserDTO";
import { loginUserDTO } from "./UserDTO/loginUserDTO";
import { AuthGuard } from "@nestjs/passport";


@Controller('Auth')
export class AuthController{
constructor(private readonly authService:AuthService,
){}



@UseGuards(AuthGuard('google'))
@Get('google/login')
 n(){
   console.log("Login");
 //  const userLogin=this.authService.logIn(body);
 //  return userLogin;
}

@Get("google/redirect")
@UseGuards(AuthGuard('google'))
  async redirectFunc(@Req() req){
  console.log("HIII");
  console.log("User>>>>>>",req.user);
  
  const token=await  this.authService.generateJwt(req.user);
  console.log(token);
}






@Get(':id')
 getUser(email:string){
   const userLogin=this.authService.getUser(email);
   return userLogin;
}


}

