import { Module } from '@nestjs/common';
import { S3Bucket } from './s3b.controller';
import { S3BService } from './s3.services';

@Module({
  imports: [],
  controllers:[S3Bucket],
  providers:[S3BService]
})
export class S3BucketModule {}
