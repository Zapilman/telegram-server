import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class userCredentialsInput {
  @Field()
  login: string;

  @Field()
  password: string;
}
