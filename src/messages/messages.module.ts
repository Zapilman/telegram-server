import { Module } from '@nestjs/common';
import { MessagesModule } from './../Documents/messages/messages.module';
import { ChatGateway } from './messages.gateway';

@Module({
  imports: [MessagesModule],
  providers: [ChatGateway],
})
export class ChatModule {}
