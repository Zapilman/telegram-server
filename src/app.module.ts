import { ChatGateway } from './events.gateway';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [EventsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
