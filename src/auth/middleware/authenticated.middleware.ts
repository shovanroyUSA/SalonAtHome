import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticatedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isAuthenticated = req.isAuthenticated();

    // Set a variable in locals to be used in views
    res.locals.isAuthenticated = isAuthenticated;

    next();
  }
}
