import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderCreatedEvent } from './events/order-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderStatusChangeEvent } from './events/order-status-change.event';
import { ServicesService } from '../services/services.service';
import { StaffMembersService } from '../staff-members/staff-members.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly eventEmitter: EventEmitter2,
    private readonly clientsService: ClientsService,
    private readonly servicesService: ServicesService,
    private readonly staffMembersService: StaffMembersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // const order = this.ordersRepository.create(createOrderDto);

    const { clientID, serviceID, staffID, date, time, status, notes } =
      createOrderDto;

    const clientEntity = await this.clientsService.findOne(clientID);
    const serviceEntity = await this.servicesService.findOne(serviceID);
    const staffMemberEntity = await this.staffMembersService.findOne(staffID);

    if (!clientEntity || !serviceEntity || !staffMemberEntity) {
      throw new NotFoundException('Client, Service, or StaffMember not found');
    }

    const order = this.ordersRepository.create({
      client: clientEntity,
      service: serviceEntity,
      staffMember: staffMemberEntity,
      date,
      time,
      status,
      notes,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // Emit the OrderCreatedEvent
    const orderCreatedEvent = new OrderCreatedEvent(savedOrder);
    this.eventEmitter.emit(OrderCreatedEvent.name, orderCreatedEvent);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { orderID: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.findOne(id);
    this.ordersRepository.merge(existingOrder, updateOrderDto);
    return this.ordersRepository.save(existingOrder);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }

  async updateStatus(orderId: number, newStatus: string): Promise<void> {
    // Fetch the order from the database
    const order = await this.findOne(orderId);

    if (!order) {
      // Handle the case where the order is not found
      throw new NotFoundException('Order not found');
    }

    // Update the status
    order.status = newStatus;

    // Save the updated order
    await this.ordersRepository.save(order);

    // Emit the order status changed event
    this.eventEmitter.emit(
      OrderStatusChangeEvent.name,
      new OrderStatusChangeEvent(orderId, newStatus),
    );
  }

  async getOrdersByClientId(clientId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { client: { clientID: clientId } },
    });
  }
}
