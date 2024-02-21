import { Module } from '@nestjs/common';
import { authmodule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { PagesModule } from './pages/pages.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "uploads"),
    serveRoot: "/uploads",
  }),   
  authmodule, ArtistModule, UserModule, PagesModule],
  providers: [],
  controllers: [],
})
export class AppModule { }
