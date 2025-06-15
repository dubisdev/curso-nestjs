import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];
}
