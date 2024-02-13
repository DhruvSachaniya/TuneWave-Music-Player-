import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { pagesservice } from './pages.service';
import { prismaservice } from 'src/prisma/prisma.service';

@Module({
  controllers: [PagesController],
  providers: [pagesservice, prismaservice],
})
export class PagesModule {}
