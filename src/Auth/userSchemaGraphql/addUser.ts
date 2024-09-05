import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class AddUser {
  @Field((type)=>Int)
  @PrimaryGeneratedColumn()
  id:number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Int)
  mobile: number;

  @Field()
  password: string;

}
