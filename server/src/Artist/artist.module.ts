import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { prismaservice } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, callback) => {
          if (file.originalname.endsWith('.mp3')) {
            callback(null, './uploads/audio_file/');
          } else if (file.mimetype.match('image')) {
            callback(null, './uploads/music_photos/');
          }
        },
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = extname(file.originalname);
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${extension}`);
        },
      }),
      fileFilter(
        req: any,
        file: {
          fieldname: string;
          originalname: string;
          encoding: string;
          mimetype: string;
          size: number;
          destination: string;
          filename: string;
          path: string;
          buffer: Buffer;
        },
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        if (
          file.originalname.endsWith('.mp3') ||
          file.mimetype.match('image')
        ) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, prismaservice],
})
export class ArtistModule {}
