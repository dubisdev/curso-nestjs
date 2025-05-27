import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  populateDb() {
    return 'Seed executed';
  }
}
