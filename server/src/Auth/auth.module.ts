import { Module } from '@nestjs/common';
import { authcontroller } from './auth.controller';
import { authservice } from './auth.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { prismaservice } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy';
import { LocalAuthGuard } from './guard';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'THEREISNOSECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    authservice,
    prismaservice,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
  ],
  controllers: [authcontroller],
})
export class authmodule {}
