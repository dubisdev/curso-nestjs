import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async executeSeed() {
    await this.insertNewProducts();

    return 'SEED EXECUTED';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = products.map((product) =>
      this.productsService.create(product),
    );

    await Promise.all(insertPromises);

    return true;
  }
}
