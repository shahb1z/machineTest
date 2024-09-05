import { Module } from '@nestjs/common';
import { IAMService } from './iam.service';
import { IAMController } from './iam.controller';

@Module({
  imports:[],
  providers:[IAMService],
  controllers:[IAMController]
})
export class IAMModule {}
