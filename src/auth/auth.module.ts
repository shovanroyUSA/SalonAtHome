import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Admin } from '../admins/entities/admin.entity';
import { Client } from '../clients/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from '../admins/admins.module';
import { ClientsModule } from '../clients/clients.module';
import { AdminsService } from '../admins/admins.service';
import { ClientsService } from '../clients/clients.service';
import { LocalStrategy } from '../local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../config/session.serializer';
import { AdminAuthController } from './admin.auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Client]),
    AdminsModule,
    ClientsModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [
    AuthService,
    AdminsService,
    ClientsService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
