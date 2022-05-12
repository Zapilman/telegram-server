import { ChatGateway } from './events.gateway';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
