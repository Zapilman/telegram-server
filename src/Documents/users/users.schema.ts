import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Channel } from '../channels/channels.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  secondName: string;

  @Prop()
  login: string;

  @Prop()
  password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}], required: false})
  channels: Channel[];
}

export const UserSchema = SchemaFactory.createForClass(User);
