import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidateAuthenticationMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOne({ id: data['id'] });
      delete user.password;
      req.body.user = user;
      next();
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
