import { Command, Console } from 'nestjs-console';
import { AdminSeederService } from '../seeder/admin-seeder.service';
import { ServiceSeederService } from '../seeder/service-seeder.service';

@Console()
export class SeedCommand {
  constructor(
    private readonly adminSeederService: AdminSeederService,
    private readonly serviceSeederService: ServiceSeederService,
  ) {}

  @Command({
    command: 'db:seed',
    description: 'Seed the database with initial data',
  })
  async handle(): Promise<void> {
    await this.adminSeederService.seedAdmins();
    await this.serviceSeederService.seedServices();
    console.log('Seeding completed.');
  }
}
