import { Module } from "@nestjs/common/decorators";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "src/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/userentity";
import {GoogleStrategy} from '../Common/GoogleStrategy'
import { UserResolver } from "./auth.resolver";
import { JwtStrategy } from "./Jwt/jwtStrategy";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports:[DatabaseModule,TypeOrmModule.forFeature([User]),
    JwtModule.register(
        {
          secret:"secretKey",
          signOptions:{
            expiresIn:360000,
          },
        }
      ),
],
    controllers:[AuthController],
    providers:[AuthService,UserResolver,GoogleStrategy,JwtStrategy],
    exports:[TypeOrmModule,AuthService]
})
export class AuthModule{}