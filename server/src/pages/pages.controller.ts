import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { pagesservice } from './pages.service';
import { JwtAuthGuard } from 'src/Auth/guard';

@Controller()
export class PagesController {
  constructor(private readonly pagesservice: pagesservice) {}

  //serach engine container login come here
  //search will find song, playlist, and artist
  @UseGuards(JwtAuthGuard)
  @Get('searchsong')
  async searchengine(@Query('query') query: string) {
    return await this.pagesservice.searchbysong(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('searchplaylist')
  async searchengine_2(@Query('query') query: string) {
    return await this.pagesservice.searchbyplaylist(query);
  }

  //liked song componets

  @UseGuards(JwtAuthGuard)
  @Get('likedsong')
  async getlikedsong(@Request() req) {
    return await this.pagesservice.detailsLikedSong(req.user);
  }

  //add song to liked songplaylist

  @UseGuards(JwtAuthGuard)
  @Post('addlikedsong')
  async addmusictolikedsong(
    @Request() req,
    @Body('music_id') music_id: number,
  ) {
    return await this.pagesservice.addMusicToLikedSongs(req.user, music_id);
  }

  //delete song to liked songplalist

  @UseGuards(JwtAuthGuard)
  @Delete('deletelikedsong')
  async deletemusictolikedsong(
    @Request() req,
    @Body('music_id') music_id: number,
  ) {
    return await this.pagesservice.deletemusictolikedsongs(req.user, music_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('isloggedin')
  async checkisloggedin(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('getmusicbyids')
  async getMusicByIds(
    @Request() req,
    @Body('musicIds') musicIds: any, // Use "any" type to accept any data type
  ) {
    try {
      // Ensure that musicIds is an array before using the map function
      if (Array.isArray(musicIds)) {
        // Find music items for the given IDs
        const musicItems = await Promise.all(
          musicIds.map(async (id) => {
            const music = await this.pagesservice.getmusicbyId(id);
            return music;
          }),
        );
        return musicItems;
      } else {
        throw new HttpException(
          'Invalid input: musicIds must be an array',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Error fetching music data:', error.message);
      throw new HttpException(
        'Failed to get music!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
