import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = loginUserDto.username;
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!(await comparePassword(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }
    delete user.password, delete user.fullName;

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    res.cookie('jwt', jwt, { httpOnly: true });

    return { massage: 'Login Succuss!', status: HttpStatus.CREATED };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { massage: 'Logout Succuss!', status: HttpStatus.CREATED };
  }
}
