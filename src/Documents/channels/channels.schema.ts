import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/users.schema';
import { Message } from '../messages/messages.schema';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], required: true})
  members: User[]

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}], required: false})
  messages: Message[]

  @Prop({type: String, required: false})
  name?: string
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
