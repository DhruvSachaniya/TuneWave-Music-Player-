import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/guard';
import { UserService } from './user.service';
import { musicdto, userplaylistdto } from './dto';

@Controller('user')
export class UserController {
    constructor(
        private userservice: UserService
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get("details")
    async getuserinfo(@Request() req): Promise<any> {
        return await this.userservice.getuserinfo(req.user);
    }

    //next route would for user so the user can create playlist
    // createplaylist and then add music then add music to playlist then delete from playlist
    @UseGuards(JwtAuthGuard)
    @Post("playlist")
    async createuserplaylist(
        @Request() req,
        @Body("name") name: string,
    ): Promise<any> {
        const dto : userplaylistdto = {
            name: name
        }
        return await this.userservice.createuserplaylist(req.user, dto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete("playlist")
    async deleteplaylist (
        @Request() req, 
        @Body("user_playlist_id") user_playlist_id: number
    ): Promise<any> {
        return await this.userservice.deleteplaylist(req.user ,user_playlist_id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("playlist_name")
    async updatename(
        @Request() req,
        @Body("user_playlist_id") user_playlist_id: number,
        @Body("changed_name") changed_name: string
    ) {
        return await this.userservice.updateplaylistname(req.user, user_playlist_id, changed_name);
    }

    @UseGuards(JwtAuthGuard)
    @Post("addmusic")
    async addmusictoplaylist(
        @Request() req,
        @Body("user_playlist_id") user_playlist_id: number,
        @Body("music_id") music_id: number
    ): Promise<any> {
        const dto: musicdto = {
            user_playlist_id,
            music_id
        }
   
        return await this.userservice.addMusicToPlaylist(req.user, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("deletemusic")
    async deletefromplaylist(
        @Request() req,
        @Body("user_playlist_id") user_playlist_id: number,
        @Body("music_id") music_id: number
    ): Promise<any> {
        const dto: musicdto = {
            user_playlist_id,
            music_id
        }

        return await this.userservice.deletefromplaylist(req.user, dto);
    }
}
