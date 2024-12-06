import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { JwtAuthGuard } from 'src/Auth/guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PlaylistDto, PlaylistMusicDto, songdto } from './dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistservice: ArtistService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getallartist(): Promise<any> {
    return await this.artistservice.getallartist();
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getartistplaylist(@Request() req) {
    return await this.artistservice.getartistdetails(req.user);
  }

  //upload music by artist
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mp3', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async uploadmusic(
    @Body('name') name: string,
    @Body('description') description: string,
    @Request() req,
    @UploadedFiles()
    files: { mp3: Express.Multer.File[]; image: Express.Multer.File[] },
  ): Promise<any> {
    console.log('hii');
    const Audiodto: songdto = {
      name: name,
      description: description,
    };
    // console.log(Audiodto, files);
    if (!files || !files.mp3 || !files.image) {
      throw new HttpException('Missing files', HttpStatus.BAD_REQUEST);
    }
    const savedmusic = await this.artistservice.uploadmusic(
      req.user,
      Audiodto,
      files,
    );

    return {
      meassge: 'music has been uploaded successfully!',
      mp3: savedmusic,
    };
  }

  //artist playlist routes
  @UseGuards(JwtAuthGuard)
  @Post('playlist')
  async createartistplaylist(@Body('name') name: string, @Request() req) {
    return await this.artistservice.createartistplaylist(req.user, name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('playlist')
  async deleteartistplaylist(
    @Request() req,
    @Body('playlist_id') artist_playlist_id: number,
  ): Promise<any> {
    return await this.artistservice.deleteplaylist(
      req.user,
      artist_playlist_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('playlist')
  async updateplaylistname(
    @Request() req,
    @Body('artist_playlist_id') artist_playlist_id: number,
    @Body('changed_name') changed_name: string,
  ): Promise<any> {
    const dto: PlaylistDto = {
      artist_playlist_id,
      changed_name,
    };
    return await this.artistservice.updateplaylistname(
      req.user,
      dto.artist_playlist_id,
      dto.changed_name,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('addmusic')
  async addmusictoplaylist(
    @Request() req,
    @Body('playlist_id') artist_playlist_id: number,
    @Body('music_id') music_id: number,
  ): Promise<any> {
    const dto: PlaylistMusicDto = {
      artist_playlist_id,
      music_id,
    };

    return await this.artistservice.addMusicToPlaylist(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('removemusic')
  async removemusicplaylist(
    @Request() req,
    @Body('playlist_id') artist_playlist_id: number,
    @Body('music_id') music_id: number,
  ): Promise<any> {
    const dto: PlaylistMusicDto = {
      artist_playlist_id,
      music_id,
    };

    return await this.artistservice.deletefromplaylist(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('playlist/:playlistid')
  async getplaylistbyid(
    @Request() req,
    @Param('playlistid') playlistid: number,
  ) {
    return await this.artistservice.getplaylistbyid(playlistid);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':artistid')
  async getartistbyid(@Param('artistid') artistid: number) {
    return await this.artistservice.getartistbyid(artistid);
  }
}
