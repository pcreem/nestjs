import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';
import { resolve } from 'dns';

@Injectable()
export class CarService {
  private cars = CARS;
  public async getCars() {
    return this.cars;
  }

  public postCar(car) {
    return this.cars.push(car);
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find(car => car.id === carId);
      if (!car) {
        throw new HttpException('Not Found', 404);
      }
      return resolve(car);
    });
  }

  public deleteCarById(id: number) {
    const index = this.cars.findIndex(car => car.id === id);
    if (index === -1) {
      throw new HttpException('Not Found', 404);
    }
    this.cars.splice(index, 1);
    return this.cars;
  }

  public putCarById(id: number, name: string, value: string) {
    const index = this.cars.findIndex(car => car.id === id);
    if (index === -1) {
      throw new HttpException('Not Found', 404);
    }
    this.cars[index][name] = value;
    return this.cars;
  }
}
