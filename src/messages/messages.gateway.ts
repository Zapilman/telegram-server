import { Server, Socket } from 'socket.io';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from 'src/Documents/messages/messages.service';
import { CreateMessageInput } from 'src/Documents/messages/dto/create-message.input';
import { ChannelsService } from 'src/Documents/channels/channels.service';
import { Channel } from '../Documents/channels/channels.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatService: ChannelsService
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageInput) {
    const message = await this.messagesService.create(createMessageDto);

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('connection')
  async connection(){
    console.log('some connect')
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('privateMessage')
  async privateMessage(@MessageBody() data: {to: string, chatId: string, content}, client: Socket): Promise<string> {
    let channel: Channel;
    try {
      channel = await this.chatService.findOne(data.chatId);
    } catch (err) {
      return 'error, channel does not exist';
    }

    this.server.to(data.to).emit("private message", {
      content: data.content,
      from: data.chatId
    })
    return 'message have been sent';
  }

  @SubscribeMessage('join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody('authorName') authorName: string,
  ): string {
    //TODO: create identifying user
    const response = 'User joined a channel';
    return response;
  }

  @SubscribeMessage('typing')
  async typing(
    @ConnectedSocket() client: Socket,
    @MessageBody('isTyping') isTyping: boolean,
  ) {
    const name = 'User';
    //TODO: connect to user document mongo
    client.broadcast.emit('typing', {
      name,
      isTyping,
    });
  }
}
