import { Args, Int, Mutation, Query,Resolver } from "@nestjs/graphql";
import { User  } from "./userSchemaGraphql/user.schema";
import { AddUser  } from "./userSchemaGraphql/addUser";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUser } from "./userSchemaGraphql/updateUser";
import { log } from "console";
import { LoginUser } from "./userSchemaGraphql/loginINput";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./Jwt/jwtGuard";
//import { GqlAuthGuard } from "src/Common/AuthGuard";


@Resolver()
export class UserResolver{
    constructor(@InjectRepository(User) private userRepo:Repository<User>){}

    
    @Query((returns)=>[User])
    @UseGuards(JwtAuthGuard)
    async getAllUsers(){
      try{
       return await this.userRepo.find();
      }catch(err){
         console.log("err>>",err)
      }
   }

   @Query(()=>User,{nullable:true})
   @UseGuards(JwtAuthGuard)
   async findUserById(@Args({name:"userId",type:()=>Int}) id:number){
      try{
         console.log(id);
       const use= await this.userRepo.findOne({where:{id}});
       console.log(use);
       return use;
      }catch(err){
         console.log("err>>",err)
      }
   }


   @Mutation(()=>User)
   @UseGuards(JwtAuthGuard)
   async addUser(@Args('addUserArgs') addUserArgs:AddUser){
   return await this.userRepo.save(addUserArgs)
   }


   @Mutation(()=>User,{nullable:true})
   @UseGuards(JwtAuthGuard)
   async updateUser(@Args('updateUserArgs') updateUserArgs:UpdateUser){
      const id=updateUserArgs.id;
      const user= await this.userRepo.findOne({where:{id}});
      if(!user) 
         console.log("User not exists");
      console.log("User updated successully");
   
     return await this.userRepo.update(id,updateUserArgs);
    }

   @Mutation(()=>String)
   @UseGuards(JwtAuthGuard)
   async deleteUser(@Args({name:'userID',type:()=>Int })id:number){
   {
    const result= await this.userRepo.delete(id);
    console.log(result)
    if(result.affected==0) return "user not found"
    else return "User deleted successfully"
    
   }
   }



   
    @Mutation(()=>User)
    async login( @Args('login') login:LoginUser){
      console.log("User log in succesfully");
       const email=login.email;
         var user=await this.userRepo.findOne({where:{email}})
         console.log(user)
        return user;  
    }
   }
   //   @Mutation(()=>User)
   //   async createUser(@Args() User:CreateUserInput){
   //    try{
   //       console.log("Data inserted using graphql")
     
   //    return this.userRepo.save(User)
   //    }catch(err){
   //       console.log("EE>>",err)
   //    }
     
    
    
