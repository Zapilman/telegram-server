import { ChatModule } from './messages/messages.module';
import { ChatGateway } from './events.gateway';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './Documents/users/users.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './Documents/messages/messages.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventsModule,
    MessagesModule,
    ChatModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Zapilman:urazdorov12@cluster0.snu90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
