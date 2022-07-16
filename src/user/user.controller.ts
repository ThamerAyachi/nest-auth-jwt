import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    delete user.password;
    return user;
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    try {
      const token = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOne({ id: data['id'] });

      delete user.password;

      return { data: user };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
