import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './dto/user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Query(() => [UserType])
  async users() {
    return this.userService.findAll();
  }
}
