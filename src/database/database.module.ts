//src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {User} from '../Auth/entities/userentity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 2000,
        username: 'postgres',
        password: '1234',
        database: 'MApp',
        entities: [User],
        synchronize: true, 
      }),
  ],
})
export class DatabaseModule {}