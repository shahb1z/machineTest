import { Injectable } from '@nestjs/common';
import { iam } from './aws.config';

@Injectable()
export class IAMService {
async getAllUsers() {
    const data = await iam.listUsers().promise();
      return data.Users ;
  }
}
 
