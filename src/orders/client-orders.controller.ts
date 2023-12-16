import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ServicesService } from '../services/services.service';
import { StaffMembersService } from '../staff-members/staff-members.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { ClientsService } from '../clients/clients.service';

@Controller()
@UseGuards(AuthenticatedGuard)
export class ClientOrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly servicesService: ServicesService,
    private readonly staffMembersService: StaffMembersService,
    private readonly clientsService: ClientsService,
  ) {}

  @Get('booking')
  @Render('customer/booking')
  async index() {
    const services = await this.servicesService.findAll();
    const staffs = await this.staffMembersService.findAll();
    const viewData = [];
    viewData['services'] = services;
    viewData['staffs'] = staffs;
    return {
      viewData: viewData,
    };
  }

  @Post('booking/store')
  @Redirect('/booking')
  async store(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const clientId = req.user.clientID;
    console.log(
      'Received order creation data for client ID:',
      clientId,
      createOrderDto,
    );
    await this.ordersService.create({
      ...createOrderDto,
      clientID: clientId,
    });
  }

  @Get('profile')
  @Render('customer/account')
  async getProfile(@Req() req) {
    const clientID = req.user.clientID;
    const client = await this.clientsService.findOne(clientID);
    const myBookings = await this.ordersService.getOrdersByClientId(clientID);
    console.log(
      'Received order history data for client ID:',
      client,
      myBookings,
    );
    const viewData = [];
    viewData['client'] = client;
    viewData['myBookings'] = myBookings;
    return {
      viewData: viewData,
    };
  }
}
