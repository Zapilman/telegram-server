import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { Channel } from '../channels/channels.schema';
import { ChannelsService } from '../channels/channels.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              @Inject(forwardRef(() => ChannelsService))
              private readonly channelsService: ChannelsService,
  ) {
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = new this.userModel(createUserInput);

    return user.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOneByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login });
    return user;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    let user: User;
    let channel: Channel;

    try {
      user = await this.userModel.findById(updateUserInput.id);
      channel = await this.channelsService.findOne(updateUserInput.channel);

      console.log(user);
      console.log(channel);
    } catch (err) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }

    return this.userModel.findOneAndUpdate({ id: user['id'] },
      { channels: [...user.channels, channel]}, {returnNewDocument: true});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getAllChats(id: string): Promise<Channel[]> {
    let user: User;
    try {
      user = await this.userModel.findById(id).populate('channels');
    } catch (err) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }

    const channels: Channel[] = await Promise.all(user.channels.map(async (channel) => {

      const userList: User[] = await Promise.all(channel.members.map(async (member: any) => {
        return this.findOne(member.toString());
      }))

      const name = userList.find((el: any) => el.id !== id).firstName;

      return ({
        messages: [...channel.messages],
        members: userList,
        name,
        id: channel['id']
      })
    }));

    return channels;
  }

}
