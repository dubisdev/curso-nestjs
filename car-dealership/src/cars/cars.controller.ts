import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Honda', 'Jeep'];

  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get(':id')
  getCarById(
    @Param('id')
    id: number,
  ) {
    if (id < 0 || id >= this.cars.length) {
      throw new Error('Car not found');
    }

    return this.cars[id];
  }
}
