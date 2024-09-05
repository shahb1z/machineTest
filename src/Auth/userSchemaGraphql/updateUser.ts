import { InputType, PartialType } from '@nestjs/graphql';
import { AddUser } from '../userSchemaGraphql/addUser'; // Ensure correct path

@InputType()
export class UpdateUser extends PartialType(AddUser) {}