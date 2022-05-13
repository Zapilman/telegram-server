import { Message } from './entities/message.entity';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  messages: Message[] = [
    { text: 'Hello!', authorName: 'Adrian' },
    { text: 'asdad', authorName: 'Gala' },
  ];

  usersDatabase = {};

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  identify(authorName: string, clientID: string): any {
    this.usersDatabase[clientID] = authorName;
    return this.usersDatabase;
  }

  async getClientName(clientID): Promise<string> {
    return this.usersDatabase[clientID] || 'user';
  }
}
