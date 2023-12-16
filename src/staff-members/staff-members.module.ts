import { Module } from '@nestjs/common';
import { StaffMembersService } from './staff-members.service';
import { StaffMembersController } from './staff-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMember } from './entities/staff-member.entity';
import { ClientStaffMembersController } from './client-staff-members.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffMember]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [StaffMembersController, ClientStaffMembersController],
  providers: [StaffMembersService],
})
export class StaffMembersModule {}
