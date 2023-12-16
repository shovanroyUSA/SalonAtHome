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
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { Response } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/admin/service')
@UseGuards(AdminGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // @Post()
  // create(@Body() createServiceDto: CreateServiceDto) {
  //   return this.servicesService.create(createServiceDto);
  // }

  @Get('/store')
  @Render('admin/service/store')
  storeService() {
    return;
  }

  @Post('/store')
  @UseInterceptors(FileInterceptor('image'))
  async store(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    console.log(response.json);
    try {
      if (!file) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'File not provided',
        });
      }
      await this.servicesService.create({
        ...createServiceDto,
        image: file.filename,
      });
      response.redirect('/admin/service');
    } catch (error) {
      console.error(error);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  // @Get()
  // findAll() {
  //   return this.servicesService.findAll();
  // }
  @Get()
  @Render('admin/service/index')
  async index() {
    const services = await this.servicesService.findAll();
    const viewData = [];
    viewData['services'] = services;
    console.log(`Service List: ${JSON.stringify(services)}`);
    return {
      viewData: viewData,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.servicesService.findOne(+id);
  // }

  @Get('/:id')
  @Render('admin/service/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['service'] = await this.servicesService.findOne(+id);
    return {
      viewData: viewData,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
  //   return this.servicesService.update(+id, updateServiceDto);
  // }

  @Post('/:id/update')
  @Redirect('/admin/service')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    await this.servicesService.update(+id, updateServiceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.servicesService.remove(+id);
  // }

  @Post('/:id')
  @Redirect('/admin/service')
  async remove(@Param('id') id: number) {
    return await this.servicesService.remove(+id);
  }
}
