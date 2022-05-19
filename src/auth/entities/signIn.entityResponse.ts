import { Field, ObjectType } from '@nestjs/graphql';
import { Token } from '../dto/token.entity';
import { User } from '../../Documents/users/entities/user.entity';


@ObjectType()
export class SignInResponse {
  @Field(() => Token)
  accessToken: Token;

  @Field(() => User)
  user: User

}