import { Field, ID, InputType } from '@nestjs/graphql';
import { Message } from '../../messages/entities/message.entity';

@InputType()
export class AddNewMessageInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => ID)
  authorId: string;
}
