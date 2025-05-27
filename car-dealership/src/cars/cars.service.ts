import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  create(createcarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      ...createcarDto,
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    const carDb = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(
        `Id provided in the body ${updateCarDto.id} does not match the URL parameter ${id}`,
      );
    }

    const newCar = { ...carDb, ...updateCarDto, id };

    this.cars = this.cars.map((c) => {
      if (c.id !== id) return c;

      console.log({ ...updateCarDto });

      return newCar;
    });

    return newCar;
  }

  delete(id: string): void {
    const car = this.findOneById(id);

    this.cars = this.cars.filter((c) => c.id !== car.id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
