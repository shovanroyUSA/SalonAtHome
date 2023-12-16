import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SessionOptions } from 'express-session';

export const configureSession = (app: NestExpressApplication) => {
  const sessionOptions: SessionOptions = {
    secret: '&3vBde#MooQwoNCab&FaEYD8',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  };

  app.use(session(sessionOptions));

  app.use(passport.initialize());
  app.use(passport.session());
};
