import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { ClientsService } from '../clients/clients.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientsService: ClientsService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Req() req): any {
  //   return req.user;
  // }
  //
  // @UseGuards(AuthenticatedGuard)
  // @Get('protected')
  // protected(@Request() req): any {
  //   return req.user;
  // }

  @Get('login')
  @Render('auth/login')
  renderLoginPage() {
    return;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() request: Request, @Res() res: Response) {
    console.log(request.user);
    await this.authService.login();
    if (request.body.userType === 'admin') {
      return res.redirect('/admin/user');
    }
    return res.redirect('/');
  }

  @Get('signup')
  @Render('auth/signup')
  loadSignupPage() {
    return;
  }

  @Post('store')
  @Redirect('/auth/login')
  async store(@Body() createClientDto: CreateClientDto) {
    await this.clientsService.create(createClientDto);
  }

  @Get('logout')
  @Redirect('/')
  logout(@Req() req): void {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
      }
    });
  }
}
