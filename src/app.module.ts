import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { GoogleStrategy } from './Common/GoogleStrategy';
import { S3BucketModule } from './S3Module/s3b.module';
import { ConfigModule } from '@nestjs/config';
import { IAMModule } from './IAM Module/iam.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground:true,
      autoSchemaFile:join(process.cwd(),'src/schema.graphql')
    }),
    ConfigModule.forRoot({isGlobal:true})
    ,AuthModule,
    DatabaseModule,
    S3BucketModule,
    IAMModule
    ],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
