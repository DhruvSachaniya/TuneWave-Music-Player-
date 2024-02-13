import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { musicdto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: prismaservice
    ) {}

    async getuserinfo(user: any): Promise<any> {
        try {
            const founduser = await this.prisma.user.findUnique({
                where: {
                    email: user.email
                }, include: {
                    User_Playlist: true,
                    Liked_songs: true
                }
            })

            if(!founduser) {
                throw new NotFoundException();
            }

            return founduser;

        } catch(error) {
            throw new HttpException(error, HttpStatus.FORBIDDEN);
        }
    }

    async createuserplaylist(user: any, dto: any): Promise<any> {
        try {
            const userplaylist = await this.prisma.user_Playlist.create({
                data: {
                    User: { connect: { id: user.id }},
                    name: dto.name,
                }
            })

            if(!userplaylist) {
                throw new HttpException("error to upload music!", HttpStatus.NOT_ACCEPTABLE);
            }

            return userplaylist;

        } catch(error) {
            throw new HttpException(error, HttpStatus.FORBIDDEN);
        }
    }
    //come delete playlist by user
    async deleteplaylist(user: any,user_playlist_id: number) {
        try {
            const playlist = await this.prisma.user_Playlist.findUnique({
                where: {
                    id: Number(user_playlist_id),
                },
                include: {
                    User: true,
                    musics: true 
                },
            });
    
            if (!playlist) {
                throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
            }
    
            
            if (playlist.User_id !== user.id) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            //gonna need user_playlist_id
            const deleteplaylist = await this.prisma.user_Playlist.delete({
                where: {
                    id: Number(user_playlist_id)
                }
            })

            if(!deleteplaylist) {
                throw new HttpException("failed to deleteplaylist!", HttpStatus.FAILED_DEPENDENCY);
            }

            return deleteplaylist;
        } catch(error) {
            throw new HttpException(error.message || 'Failed to delete music to playlist', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //come update name of playlist by user
    async updateplaylistname(user: any ,user_playlist_id: number, changed_name: string) {
        try {
            const playlist = await this.prisma.user_Playlist.findUnique({
                where: {
                    id: Number(user_playlist_id),
                },
                include: {
                    User: true,
                    musics: true 
                },
            });
    
            if (!playlist) {
                throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
            }
    
            
            if (playlist.User_id !== user.id) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            const updateplaylistname = await this.prisma.user_Playlist.update({
                where: {
                    id: Number(user_playlist_id),
                }, data: {
                    name: changed_name
                }
            })

            if(!updateplaylistname) {
                throw new HttpException("error to update name!", HttpStatus.NOT_MODIFIED)
            }

            return {
                updated_data : updateplaylistname
            }
        } catch(error) {
            throw new HttpException(error.message || 'Failed to update name of playlist', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addMusicToPlaylist(user: any, dto: musicdto) {
        try {
            // Check if the user owns the playlist or has permission to modify it
            const playlist = await this.prisma.user_Playlist.findUnique({
                where: {
                    id: Number(dto.user_playlist_id),
                },
                include: {
                    User: true,
                    musics: true 
                },
            });
    
            if (!playlist) {
                throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
            }
    
            
            if (playlist.User_id !== user.id) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
    
            
            const updatedPlaylist = await this.prisma.user_Playlist.update({
                where: {
                    id: Number(dto.user_playlist_id),
                },
                data: {
                    musics: { connect: { id: Number(dto.music_id) }},
                },
            });
    
            return updatedPlaylist;
        } catch (error) {
            
            throw new HttpException(error.message || 'Failed to add music to playlist', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    //delteing music from playlist by user
    async deletefromplaylist(user: any, dto: any) {
        try{
            //plylist_id , music_id
            const playlist = await this.prisma.user_Playlist.findUnique({
                where: {
                    id: Number(dto.user_playlist_id),
                },
                include: {
                    User: true,
                    musics: true 
                },
            });
    
            if (!playlist) {
                throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
            }
    
            
            if (playlist.User_id !== user.id) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            const deletemusic = await this.prisma.user_Playlist.update({
                where: {
                    id: Number(dto.user_playlist_id)
                },
                data: {
                    musics: {
                        disconnect: { id: Number(dto.music_id)}
                    }
                }
            })

            return deletemusic;

        } catch(error) {
            throw new HttpException(error.meassage || 'failed to delete music to playlist', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
