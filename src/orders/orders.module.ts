import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderEventHandlers } from './events/order-event-handlers';
import { ClientOrdersController } from './client-orders.controller';
import { ServicesService } from '../services/services.service';
import { StaffMembersService } from '../staff-members/staff-members.service';
import { Service } from '../services/entities/service.entity';
import { StaffMember } from '../staff-members/entities/staff-member.entity';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([StaffMember]),
  ],
  controllers: [OrdersController, ClientOrdersController],
  providers: [
    OrdersService,
    OrderEventHandlers,
    ClientsService,
    ServicesService,
    StaffMembersService,
  ],
})
export class OrdersModule {}
