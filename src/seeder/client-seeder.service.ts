import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class ClientSeederService {
  private readonly logger = new Logger(ClientSeederService.name);
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async seedClients() {
    const clients = [
      {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        email: 'client@demo.com',
        phone: '1234567890',
        address: '123 Main St, Cityville',
        password: 'aaaaaa',
      },
    ];

    for (const clientData of clients) {
      try {
        const client = this.clientRepository.create(clientData);
        await this.clientRepository.save(client);
      } catch (error) {
        // Handle the duplicate entry error
        if (
          error instanceof QueryFailedError &&
          error.message.includes('Duplicate entry')
        ) {
          this.logger.warn(
            `Client with email '${clientData.email}' already exists. Skipping...`,
          );
        } else {
          // Rethrow other types of errors
          throw error;
        }
      }
    }
  }
}
