import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      // @ts-expect-error Password should not be deleted as it is not optional in the User entity
      delete user.password; // Remove password from the response

      return user;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError(error: any): never {
    if (error instanceof QueryFailedError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((error as any).code === '23505') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new BadRequestException((error as any).detail);
      }
    }

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
