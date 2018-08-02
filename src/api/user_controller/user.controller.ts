import { Controller, Get, PathParams } from '@tsed/common';
import { User } from './User.dto';

@Controller('/profile')
export class ProfileController {

  @Get('/')
  async getUser(): Promise<User[]> {
    return [
      {
        id: '1',
        username: 'kian132'
      }
    ];
  }

  @Get('/:id')
  async getSingleUser(@PathParams('id') id: number): Promise<User> {
    return {
      id: id ,
      username: 'saban'
    };
  }
}
