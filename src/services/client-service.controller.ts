import { Controller, Get, Render } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('/services')
export class ClientServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('/')
  @Render('customer/services')
  async index() {
    const services = await this.servicesService.findAll();
    const viewData = [];
    viewData['services'] = services;
    return {
      viewData: viewData,
    };
  }
}
