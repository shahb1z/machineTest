import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @Field((type)=>Int,{nullable:true})
  @PrimaryGeneratedColumn()
  id:number;

  @Field({nullable:true})
  username: string;

  @Field({nullable:true})
  email: string;

  @Field(() => Int,{nullable:true})
  mobile: number;

  @Field({nullable:true})
  password: string;

}
