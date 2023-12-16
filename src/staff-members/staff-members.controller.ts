import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Render,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StaffMembersService } from './staff-members.service';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('/admin/staff')
@UseGuards(AdminGuard)
export class StaffMembersController {
  constructor(private readonly staffMembersService: StaffMembersService) {}

  // @Post()
  // create(
  //   @Body() createStaffMemberDto: CreateStaffMemberDto,
  // ): Promise<StaffMember> {
  //   return this.staffMembersService.create(createStaffMemberDto);
  // }

  @Get('/store')
  @Render('admin/staff/store')
  storeStaff() {
    return;
  }

  @Post('/store')
  @UseInterceptors(FileInterceptor('image'))
  async store(
    @Body() createStaffMemberDto: CreateStaffMemberDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    try {
      if (!file) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'File not provided',
        });
      }
      await this.staffMembersService.create({
        ...createStaffMemberDto,
        image: file.filename,
      });
      response.redirect('/admin/staff');
    } catch (error) {
      console.error(error);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  // @Get()
  // findAll(): Promise<StaffMember[]> {
  //   return this.staffMembersService.findAll();
  // }

  @Get('/')
  @Render('admin/staff/index')
  async index() {
    const staffs = await this.staffMembersService.findAll();
    const viewData = [];
    viewData['staffs'] = staffs;
    console.log(`Staff List: ${JSON.stringify(staffs)}`);
    return {
      viewData: viewData,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') staffId: number): Promise<StaffMember> {
  //   return this.staffMembersService.findOne(staffId);
  // }

  @Get('/:id')
  @Render('admin/staff/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['staff'] = await this.staffMembersService.findOne(+id);
    return {
      viewData: viewData,
    };
  }

  // @Patch(':id')
  // update(
  //   @Param('id') staffId: number,
  //   @Body() updateStaffMemberDto: UpdateStaffMemberDto,
  // ): Promise<StaffMember> {
  //   return this.staffMembersService.update(staffId, updateStaffMemberDto);
  // }

  @Post('/:id/update')
  @Redirect('/admin/staff')
  async update(
    @Param('id') id: string,
    @Body() updateStaffMemberDto: UpdateStaffMemberDto,
  ) {
    await this.staffMembersService.update(+id, updateStaffMemberDto);
  }

  // @Delete(':id')
  // remove(@Param('id') staffId: number): Promise<void> {
  //   return this.staffMembersService.remove(staffId);
  // }

  @Post('/:id')
  @Redirect('/admin/staff')
  async remove(@Param('id') id: number) {
    return this.staffMembersService.remove(+id);
  }
}
