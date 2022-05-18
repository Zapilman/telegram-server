import { userCredentialsInput } from './dto/find-user.input';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/Documents/users/dto/create-user.input';
import { UsersService } from 'src/Documents/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Documents/users/users.schema';
import { Token } from './dto/token.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async IdentifyUser(
    userCredentialsInput: userCredentialsInput,
  ): Promise<User> {
    const candidate = await this.findUserIsExist(userCredentialsInput.login);
    if (!candidate) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const isPasswordMatch = await bcrypt.compare(
      userCredentialsInput.password,
      candidate.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return candidate;
  }

  async registration(createUserInput: CreateUserInput): Promise<Token> {
    const candidate = await this.findUserIsExist(createUserInput.login);

    if (candidate) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createUserInput.password, 5);
    const user = await this.userService.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: any): Promise<Token> {
    const payload = {
      login: user.login,
      firstName: user.firstName,
      id: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: '24h',
    };
  }

  private async findUserIsExist(login: string) {
    const existUser = await this.userService.findOneByLogin(login);
    return existUser;
  }
}
