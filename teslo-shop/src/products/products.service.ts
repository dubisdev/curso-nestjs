import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUuid } from 'uuid';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map((url) =>
          this.productImageRepository.create({ url }),
        ),
      });

      await this.productRepository.save(product);

      return { ...product, images };
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return products.map((p) => ({
      ...p,
      images: p.images.map((img) => img.url),
    }));
  }

  async findOne(term: string) {
    if (isUuid(term)) {
      const foundByUuid = await this.productRepository.findOneBy({ id: term });

      if (foundByUuid) return foundByUuid;
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      const product = await queryBuilder
        .where(`UPPER(title) = :title OR slug = :slug`, {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();

      if (product) return product;
    }

    throw new NotFoundException(`Product with id ${term} not found`);
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((img) => img.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...toUpdate,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Create query runner to handle images
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((url) =>
          this.productImageRepository.create({ url, product }),
        );
      }

      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const result = await this.productRepository.delete({ id });

    if (result.affected === 1) return;

    throw new BadRequestException(`Product with id ${id} not found`);
  }

  private handleException(error: unknown) {
    if (error instanceof QueryFailedError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((error as any).code === '23505') {
        throw new BadRequestException();
      }
    }

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleException(error);
    }
  }
}
