import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  text: string;

  @Prop()
  authorName: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
