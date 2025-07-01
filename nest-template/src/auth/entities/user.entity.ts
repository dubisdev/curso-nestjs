import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false, // Prevents password from being selected by default
  })
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  checkEmailCasing() {
    this.email = this.email.toLowerCase().trim();
  }
}
