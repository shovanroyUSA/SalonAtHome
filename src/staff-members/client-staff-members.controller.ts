import { Controller, Get, Render } from '@nestjs/common';
import { StaffMembersService } from './staff-members.service';

@Controller()
export class ClientStaffMembersController {
  constructor(private readonly staffMembersService: StaffMembersService) {}

  @Get('/about')
  @Render('customer/about')
  async index() {
    const staffs = await this.staffMembersService.findAll();
    const viewData = [];
    viewData['staffs'] = staffs;
    return {
      viewData: viewData,
    };
  }

  @Get('/contact')
  @Render('customer/contact')
  contact() {
    return;
  }
}
