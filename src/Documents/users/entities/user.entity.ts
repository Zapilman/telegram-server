import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Example field (placeholder)' })
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  login: string;

  @Field()
  password: string;
}
