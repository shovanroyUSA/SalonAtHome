import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdminSeederService } from './admin-seeder.service';
import { ServiceSeederService } from './service-seeder.service';
import { ClientSeederService } from './client-seeder.service';
import { StaffMemberSeederService } from './staff-member-seeder.service';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const adminSeederService = app.get(AdminSeederService);
  const clientSeederService = app.get(ClientSeederService);
  const staffMemberSeederService = app.get(StaffMemberSeederService);
  const serviceSeederService = app.get(ServiceSeederService);

  await adminSeederService.seedAdmins();
  await clientSeederService.seedClients();
  await staffMemberSeederService.seedStaffMembers();
  await serviceSeederService.seedServices();

  await app.close();
}

runSeeder();
