import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { pagesservice } from './pages.service';
import { JwtAuthGuard } from 'src/Auth/guard';

@Controller()
export class PagesController {
    constructor(
        private readonly pagesservice: pagesservice 
    ) {}

    //serach engine container login come here
    //search will find song, playlist, and artist
    @UseGuards(JwtAuthGuard)
    @Get('searchsong')
    async searchengine(
        @Query('query') query: string
    ) {
        return await this.pagesservice.searchbysong(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get("searchplaylist")
    async searchengine_2(
        @Query('query') query: string 
    ) {
        return await this.pagesservice.searchbyplaylist(query);
    }

    //liked song componets
    
    @UseGuards(JwtAuthGuard)
    @Get("likedsong")
    async getlikedsong(
        @Request() req
    ) {
        return await this.pagesservice.detailsLikedSong(req.user);
    }

    //add song to liked songplaylist

    @UseGuards(JwtAuthGuard)
    @Post("addlikedsong")
    async addmusictolikedsong(
        @Request() req,
        @Body("music_id") music_id: number
    ) {
        return await this.pagesservice.addMusicToLikedSongs(req.user, music_id);
    }

    //delete song to liked songplalist

    @UseGuards(JwtAuthGuard)
    @Delete("deletelikedsong")
    async deletemusictolikedsong(
        @Request() req,
        @Body("music_id") music_id: number
    ) {
        return await this.pagesservice.deletemusictolikedsongs(req.user, music_id);
    }
}
