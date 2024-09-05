import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class  LoginUser {
 @Field({nullable:true})
 email: string;

  @Field()
  password: string;
}