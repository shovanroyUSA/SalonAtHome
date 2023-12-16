import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { MailService } from '../../mail/mail.service';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './order-created.event';
import { OrderStatusChangeEvent } from './order-status-change.event';

@Injectable()
export class OrderEventHandlers {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mailService: MailService,
  ) {}

  @OnEvent(OrderCreatedEvent.name)
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    try {
      const orderId = event.order.orderID;
      const order = await this.ordersService.findOne(orderId);

      if (order) {
        await this.mailService.sendOrderNotificationToAdmin(order);
        await this.mailService.sendOrderNotificationToClient(order);

        console.log(`Order Created: ${orderId}`);
        console.log(`Order Details: ${JSON.stringify(order)}`);
      } else {
        console.log(`Order not found with ID: ${orderId}`);
      }
    } catch (error) {
      console.error('Error handling OrderCreatedEvent:', error.message);
      // Handle the error appropriately
    }
  }

  @OnEvent(OrderStatusChangeEvent.name)
  async handleOrderStatusChangeEvent(event: OrderStatusChangeEvent) {
    try {
      const orderId = event.orderId;
      const newStatus = event.newStatus;
      const order = await this.ordersService.findOne(orderId);

      if (order) {
        switch (newStatus) {
          case 'confirmed':
            await this.mailService.sendOrderConfirmationToClient(order);
            break;
          case 'completed':
            await this.mailService.sendOrderCompletionToClient(order);
            break;
          case 'cancelled':
            await this.mailService.sendOrderCancellationToClient(order);
            break;
        }

        console.log(`Order ${orderId} status changed to ${newStatus}`);
        console.log(`Order Details: ${JSON.stringify(order)}`);
      } else {
        console.log(`Order not found with ID: ${orderId}`);
      }
    } catch (error) {
      console.error('Error handling OrderStatusChangeEvent:', error.message);
      // Handle the error appropriately
    }
  }
}
