import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StaffMembersModule } from './staff-members/staff-members.module';
import { OrdersModule } from './orders/orders.module';
import { AdminsModule } from './admins/admins.module';
import { ClientsModule } from './clients/clients.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { MailModule } from './mail/mail.module';
import { ServicesService } from './services/services.service';
import { Service } from './services/entities/service.entity';
import { StaffMember } from './staff-members/entities/staff-member.entity';
import { StaffMembersService } from './staff-members/staff-members.service';
import { AuthModule } from './auth/auth.module';
import { AuthenticatedMiddleware } from './auth/middleware/authenticated.middleware';
import { AdminsService } from './admins/admins.service';
import { Admin } from './admins/entities/admin.entity';
import { AdminSeederService } from './seeder/admin-seeder.service';
import { ServiceSeederService } from './seeder/service-seeder.service';
import { SeedCommand } from './commands/seed.command';
import { Client } from './clients/entities/client.entity';
import { ClientsService } from './clients/clients.service';
import { ClientSeederService } from './seeder/client-seeder.service';
import { StaffMemberSeederService } from './seeder/staff-member-seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ServicesModule,
    StaffMembersModule,
    OrdersModule,
    AdminsModule,
    ClientsModule,
    MailModule,
    TypeOrmModule.forFeature([Admin]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([StaffMember]),
    TypeOrmModule.forFeature([Service]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminsService,
    ClientsService,
    StaffMembersService,
    ServicesService,
    AdminSeederService,
    ClientSeederService,
    StaffMemberSeederService,
    ServiceSeederService,
    SeedCommand,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticatedMiddleware).forRoutes('*');
  }
}
