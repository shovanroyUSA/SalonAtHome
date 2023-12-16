import {
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
import { Response, Request } from 'express';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('admin')
export class AdminAuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @Render('auth/admin-login')
  renderAdminLoginPage() {
    return;
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() request: Request, @Res() res: Response) {
    console.log(request.user);
    await this.authService.login();
    if (request.body.userType === 'admin') {
      return res.redirect('/admin/user');
    }
    return res.redirect('/');
  }

  @Get('auth/logout')
  @UseGuards(AuthenticatedGuard)
  @Redirect('/admin')
  logout(@Req() req): void {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
      }
    });
  }
}
