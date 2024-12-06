import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { prismaservice } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, prismaservice],
})
export class UserModule {}
