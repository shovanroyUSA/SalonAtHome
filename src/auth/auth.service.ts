import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminsService,
    private clientService: ClientsService,
  ) {}

  async login(): Promise<any> {
    return {
      message: 'Login successful!',
      statusCode: HttpStatus.OK,
    };
  }

  async validateUser(
    email: string,
    password: string,
    userType: string,
  ): Promise<any> {
    if (userType === 'admin') {
      const admin = await this.adminService.findByEmail(email);
      if (admin && admin.validatePassword(password)) {
        return { ...admin, role: 'admin' };
      }
    } else if (userType === 'client') {
      const client = await this.clientService.findByEmail(email);
      if (client && client.validatePassword(password)) {
        return { ...client, role: 'client' };
      }
    }

    return null;
  }
}
