import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class AdminSeederService {
  private readonly logger = new Logger(AdminSeederService.name);
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async seedAdmins() {
    const admins = [
      {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        email: 'admin@demo.com',
        phone: '1234567890',
        address: '123 Main St, Cityville',
        password: 'aaaaaa',
      },
    ];

    for (const adminData of admins) {
      try {
        const admin = this.adminRepository.create(adminData);
        await this.adminRepository.save(admin);
      } catch (error) {
        // Handle the duplicate entry error
        if (
          error instanceof QueryFailedError &&
          error.message.includes('Duplicate entry')
        ) {
          this.logger.warn(
            `Admin with email '${adminData.email}' already exists. Skipping...`,
          );
        } else {
          // Rethrow other types of errors
          throw error;
        }
      }
    }
  }
}
