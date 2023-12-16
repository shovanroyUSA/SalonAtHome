import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Service } from '../../services/entities/service.entity';
import { StaffMember } from '../../staff-members/entities/staff-member.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderID: number;

  @ManyToOne(() => Client, { eager: true, nullable: false })
  @JoinColumn({ name: 'clientID' })
  client: Client;

  @ManyToOne(() => Service, { eager: true, nullable: false })
  @JoinColumn({ name: 'serviceID' })
  service: Service;

  @ManyToOne(() => StaffMember, { eager: true, nullable: false })
  @JoinColumn({ name: 'staffID' })
  staffMember: StaffMember;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'varchar', nullable: true })
  time: string;

  @Column({ type: 'varchar', nullable: false, default: 'pending' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
