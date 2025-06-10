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
import { QueryFailedError, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUuid } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    if (isUuid(term)) {
      const foundByUuid = await this.productRepository.findOneBy({ id: term });

      if (foundByUuid) return foundByUuid;
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      const product = await queryBuilder
        .where(`UPPER(title) = :title OR slug = :slug`, {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();

      if (product) return product;
    }

    throw new NotFoundException(`Product with id ${term} not found`);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    try {
      return this.productRepository.save(product);
    } catch (error) {
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
}
