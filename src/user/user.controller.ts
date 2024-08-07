// src/user/organiser.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  async fetchAllUsers() {
    return this.userService.fetchAllUsers();
  }
}
