import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Example field (placeholder)' })
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  login: string;

  @Field()
  password: string;
}
