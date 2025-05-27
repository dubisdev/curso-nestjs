import { CarsService } from '@/cars/cars.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(private readonly carsService: CarsService) {}

  populateDb() {
    return 'Seed executed';
  }
}
