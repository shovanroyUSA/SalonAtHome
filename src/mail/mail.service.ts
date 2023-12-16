import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderNotificationToAdmin(order: Order): Promise<void> {
    await this.mailerService.sendMail({
      to: process.env.ADMIN_MAIL,
      subject: 'New Order Notification',
      template: 'admin-order-notification',
      context: {
        clientName: order.client.firstName,
        serviceName: order.service.serviceName,
        staffName: order.staffMember.firstName,
        date: order.date,
        time: order.time,
        totalAmount: order.service.price,
        status: order.status,
        notes: order.notes,
        companyName: process.env.COMPANY_NAME,
        adminName: process.env.ADMIN_NAME,
        adminMail: process.env.ADMIN_MAIL,
      },
    });
  }

  async sendOrderNotificationToClient(order: Order): Promise<void> {
    await this.mailerService.sendMail({
      to: order.client.email,
      subject: 'Order Notification',
      template: 'client-order-notification',
      context: {
        clientName: order.client.firstName,
        serviceName: order.service.serviceName,
        staffName: order.staffMember.firstName,
        date: order.date,
        time: order.time,
        totalAmount: order.service.price,
        status: order.status,
        notes: order.notes,
        companyName: process.env.COMPANY_NAME,
        adminName: process.env.ADMIN_NAME,
        adminMail: process.env.ADMIN_MAIL,
      },
    });
  }

  async sendOrderConfirmationToClient(order: Order): Promise<void> {
    await this.mailerService.sendMail({
      to: order.client.email,
      subject: 'Order Confirmation',
      template: 'client-order-confirm',
      context: {
        clientName: order.client.firstName,
        serviceName: order.service.serviceName,
        staffName: order.staffMember.firstName,
        date: order.date,
        time: order.time,
        totalAmount: order.service.price,
        status: order.status,
        notes: order.notes,
        companyName: process.env.COMPANY_NAME,
        adminName: process.env.ADMIN_NAME,
        adminMail: process.env.ADMIN_MAIL,
      },
    });
  }

  async sendOrderCancellationToClient(order: Order): Promise<void> {
    await this.mailerService.sendMail({
      to: order.client.email,
      subject: 'Order Cancellation',
      template: 'client-order-cancel',
      context: {
        clientName: order.client.firstName,
        serviceName: order.service.serviceName,
        staffName: order.staffMember.firstName,
        date: order.date,
        time: order.time,
        totalAmount: order.service.price,
        status: order.status,
        notes: order.notes,
        companyName: process.env.COMPANY_NAME,
        adminName: process.env.ADMIN_NAME,
        adminMail: process.env.ADMIN_MAIL,
      },
    });
  }

  async sendOrderCompletionToClient(order: Order): Promise<void> {
    await this.mailerService.sendMail({
      to: order.client.email,
      subject: 'Order Completion',
      template: 'client-order-complete',
      context: {
        clientName: order.client.firstName,
        serviceName: order.service.serviceName,
        staffName: order.staffMember.firstName,
        date: order.date,
        time: order.time,
        totalAmount: order.service.price,
        status: order.status,
        notes: order.notes,
        companyName: process.env.COMPANY_NAME,
        adminName: process.env.ADMIN_NAME,
        adminMail: process.env.ADMIN_MAIL,
      },
    });
  }
}
