import { ChatGateway } from './events.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatGateway],
})
export class EventsModule {}
