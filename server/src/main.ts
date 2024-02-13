import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import { LocalStrategy } from './Auth/strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
  )
  // app.use(passport.initialize());
  await app.listen(3333);
}
bootstrap();
