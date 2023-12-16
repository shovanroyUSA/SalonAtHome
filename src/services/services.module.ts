import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ClientServiceController } from './client-service.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [ServicesController, ClientServiceController],
  providers: [ServicesService],
})
export class ServicesModule {}
