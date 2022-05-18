import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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
  id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
