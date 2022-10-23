import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const userExists = await this.userRepository.findOne({ username: 'user' });
    if (!userExists) {
      let user = new User();
      user.username = 'user';

      const saltOrRounds = 10;
      user.password = await bcrypt.hash('1234567890', saltOrRounds);
      user.name = 'Test Name';
      user.isAdmin = false;
      user = await this.userRepository.save(user);
      
    }

    const adminExists = await this.userRepository.findOne({
      username: 'admin',
    });
    if (!adminExists) {
      const admin = new User();
      admin.username = 'admin';
      admin.name = 'Test Admin';

      const saltOrRounds = 10;
      admin.password = await bcrypt.hash('1234567890', saltOrRounds);
      admin.isAdmin = true;
      await this.userRepository.save(admin);
    }
  }

  async create(createUserDto: CreateUserDto) {
    let user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (user) {
      throw new HttpException(
        'Username already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    user = new User();
    user.username = createUserDto.username;

    const saltOrRounds = 10;
    user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.isAdmin = false;
    user.name = createUserDto.name;
    user = await this.userRepository.save(user);

    const returnValue = new User();

    returnValue.id = user.id;
    returnValue.username = user.username;

    return returnValue;
  }

  async findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateIsAdmin(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException('Resource not found.', HttpStatus.NOT_FOUND);
    }

    user.isAdmin = updateUserDto.isAdmin;

    user = await this.userRepository.save(user);

    user.password = undefined;

    return user;
  }
}
