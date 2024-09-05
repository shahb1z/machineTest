import { Injectable, UnauthorizedException } from '@nestjs/common';
import  { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/userentity';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
constructor(private readonly authService:AuthService){
super({
     
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration:false,
    secretOrKey:'secretKey',
});
console.log("DJkf");
}

validate(payload:any){
    console.log("3");
    const user= this.authService.validateUser(payload);
    if(!user){
        console.log("jdk");
        throw new UnauthorizedException();
    }
    return user;
}
}