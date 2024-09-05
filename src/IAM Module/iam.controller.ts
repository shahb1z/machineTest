import { Controller, Get, Post, Req } from '@nestjs/common';
import { IAMService } from './iam.service';

@Controller("IAM")
export class IAMController {
  constructor(private readonly iamService: IAMService) {}

  @Get('users')
  async getUsers() {
    const usersList= await this.iamService.getAllUsers();
    return {
      status:"success",
      message: "All users successfully fetched",
      List_of_All_Usars:usersList,
    }
  }
  


}
