import { Module } from '@nestjs/common';
import { authmodule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PagesController } from './pages/pages.controller';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), authmodule, ArtistModule, UserModule, PagesModule],
  providers: [],
  controllers: [],
})
export class AppModule { }
