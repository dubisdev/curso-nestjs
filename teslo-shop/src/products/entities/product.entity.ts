import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '7e1c9913-bed1-4d0f-a65d-64f67fea4ef0',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Teslo Shirt',
    description: 'The title of the product',
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 12.55,
    description: 'The price of the product',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'A comfortable and stylish shirt for everyday wear.',
    description: 'A brief description of the product',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'teslo-shirt',
    description: 'A unique slug for the product, used in URLs',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty()
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty()
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty()
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @ManyToOne(() => User, (u) => u.products, { eager: true })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
