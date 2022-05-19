import { userCredentialsInput } from './dto/find-user.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/Documents/users/dto/create-user.input';
import { User } from 'src/Documents/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Token } from './dto/token.entity';
import { SignInResponse } from './entities/signIn.entityResponse';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.registration(createUserInput);
  }

  @Mutation(() => SignInResponse)
  signIn(
    @Args('userCredentialsInput') userCredentialsInput: userCredentialsInput,
  ) {
    return this.authService.IdentifyUser(userCredentialsInput);
  }

  @Query(() => User)
  getUserInfo(@Args('token') token: string) {
    return this.authService.getUserInfo(token);
  }
}
