import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    { id: 1, make: 'Toyota', model: 'Corolla' },
    { id: 2, make: 'Honda', model: 'Civic' },
    { id: 3, make: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new Error('Car not found');
    }
    return car;
  }
}
