import { Module } from '@nestjs/common';
import { ChannelsModule } from 'src/Documents/channels/channels.module';
import { MessagesModule } from './../Documents/messages/messages.module';
import { ChatGateway } from './messages.gateway';

@Module({
  imports: [MessagesModule, ChannelsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
