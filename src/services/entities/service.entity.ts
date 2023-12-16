import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  serviceID: number;

  @Column({ unique: true })
  serviceName: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  image: string;
}
