import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiBody({
    schema: {
      example: {"username":"myusername", "password":"mypassword"}
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
