import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { email } = createClientDto;

    // Check if the email is already registered
    const existingClient = await this.clientRepository.findOne({
      where: { email },
    });
    if (existingClient) {
      throw new ConflictException(`Client with email ${email} already exists`);
    }

    const client = this.clientRepository.create({
      ...createClientDto,
      password: 'aaaaaa',
    });
    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { clientID: id },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const existingClient = await this.findOne(id);
    this.clientRepository.merge(existingClient, updateClientDto);
    return this.clientRepository.save(existingClient);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    return this.clientRepository.findOne({
      where: { email },
    });
  }
}
