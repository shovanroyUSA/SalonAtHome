import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Render,
  Redirect,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('/admin/order')
@UseGuards(AdminGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Post()
  // async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
  //   return this.ordersService.create(createOrderDto);
  // }

  @Post('store')
  @Redirect('/admin/orders')
  async store(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    await this.ordersService.create(createOrderDto);
  }

  // @Get()
  // async findAll(): Promise<Order[]> {
  //   return this.ordersService.findAll();
  // }

  @Get('/')
  @Render('admin/order/index')
  async index() {
    const orders = await this.ordersService.findAll();
    const viewData = [];
    viewData['orders'] = orders;
    console.log(`Order List: ${JSON.stringify(orders)}`);
    return {
      viewData: viewData,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateOrderDto: UpdateOrderDto,
  // ): Promise<Order> {
  //   return this.ordersService.update(id, updateOrderDto);
  // }

  @Post(':id/update-status') // POST /admin/order/:id/update-status
  @Redirect('/admin/order') // Redirect to another page after successful update
  async updateStatus(
    @Param('id') orderId: number,
    @Body('status') newStatus: string,
  ): Promise<void> {
    // Validate newStatus if needed
    const validStatusValues: string[] = [
      'pending',
      'confirmed',
      'completed',
      'cancelled',
    ];
    if (!validStatusValues.includes(newStatus)) {
      // Throw a BadRequestException for invalid status
      throw new BadRequestException('Invalid status value');
    }

    // Update the status of the order
    await this.ordersService.updateStatus(orderId, newStatus);
  }

  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   return this.ordersService.remove(id);
  // }

  @Post('/:id')
  @Redirect('/admin/order')
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(+id);
  }
}
