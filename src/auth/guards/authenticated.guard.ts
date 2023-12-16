import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();

    if (!isAuthenticated) {
      const returnUrl = request.originalUrl || '/';
      request.res.redirect(
        `/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`,
      );
      return false;
    }

    return true;
  }
}
