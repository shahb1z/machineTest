import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy } from "passport-google-oauth20"
import { AuthService } from "../Auth/auth.service"; 

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(private readonly authService:AuthService){
        super({   clientID:'914781127790-8tcdnv6dqjvhe3ab8atil468trg0ideb.apps.googleusercontent.com',
            clientSecret:'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',
            callbackURL:'http://localhost:3000/Auth/google/redirect',
            scope:['profile','email'],
        });
        console.log("HIIII")
    }
     
     
     validate(accessToken:string,refreshToken:string,profile:Profile){
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        
        const user=this.authService.getUser(profile.email)
        if(!user) return false;
        else return user;
      

}
}