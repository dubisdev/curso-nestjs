import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async executeSeed() {
    await this.deleteTables();

    await this.insertUsers();

    // TODO - Insert seed data

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    // TODO - Implement delete logic
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      const newUser = this.userRepository.create(user);
      users.push(newUser);
    });

    const dbUsers = await this.userRepository.save(users);

    return dbUsers[0];
  }
}
