import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm/User';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });
    return this.userRepository.save(newUser);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  async findOne(condition: any): Promise<UserEntity> {
    return this.userRepository.findOneBy(condition);
  }
}
