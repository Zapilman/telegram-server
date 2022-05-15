import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  text: string;

  @Field()
  authorName: string;
}
