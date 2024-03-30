import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';

@Injectable()
export class pagesservice {
    constructor(
        private prisma: prismaservice
    ) {}

    async searchbysong(query: string) {
        try {
            const findsong = await this.prisma.music.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    }
                }, 
            })

            if(!findsong) {
                throw new HttpException("error to findsong!", HttpStatus.BAD_REQUEST);
            }

            if(findsong.length === 0) {
                return {
                    meassage: `no song found named ${query}`
                }
            }

            return findsong;
        } catch(error) {
            throw new HttpException(error.meassage || "failed to serach song!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async searchbyplaylist(query: string) {
        try {
            const finduserplaylist = await this.prisma.user_Playlist.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    }
                }, include: {
                    musics: true
                }
            })

            const findartistplaylist = await this.prisma.artist_Playlist.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    }
                }, include: {
                    musics: true
                }
            })
            
            if(!finduserplaylist || !findartistplaylist) {
                throw new HttpException("failed to find playlist!", HttpStatus.BAD_REQUEST);
            }

            if(finduserplaylist.length === 0 && findartistplaylist.length === 0) {
                return {
                    meassage: "no playlist found!"
                }
            }

            return {
                playlist: {
                    findartistplaylist,
                    finduserplaylist
                }
            }

        } catch(error) {
            throw new HttpException(error || "failed to search songbyplaylist!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //liked song logic will come here
    async detailsLikedSong(user: any) {
        try {
            // Find the user
            const findUser = await this.prisma.user.findUnique({
                where: {
                    email: user.email
                }
            });
            
            if (findUser) {
                // Find the liked songs for the user
                const likedSongs = await this.prisma.liked_songs.findMany({
                    where: {
                        User_id: findUser.id
                    }
                });
    
                // Return the liked songs
                return likedSongs;
            } else {
                const likedSongs = await this.prisma.liked_songs.findMany({
                    where: {
                        ArtistId: user.id
                    }
                })

                return likedSongs;
            }
        } catch(error) {
            throw new HttpException(error.message || "Failed to get liked song details", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //add song to liked songs
    // async addmusictolikedsong(user: any, music_id: number) {
    //     //music id
    //     try {
    //         // Find the user
    //         const findUser = await this.prisma.user.findUnique({
    //             where: {
    //                 email: user.email
    //             }, include: {
    //                 Liked_songs: true
    //             }
    //         });
            
    //         if (findUser) {
    //             // Find the liked songs for the user
    //             const likedSongs = await this.prisma.liked_songs.update({
    //                 where: {
    //                     id: findUser.Liked_songs[0].id
    //                 }, data: {
    //                     music: {
    //                         music_id: [music_id]
    //                     }
    //                 }
    //             });
    
    //             // Return the liked songs
    //             return likedSongs;
    //         } else {
    //             const findartist = await this.prisma.artist.findUnique({
    //                 where: {
    //                     email: user.email
    //                 }, include: {
    //                     Liked_songs: true
    //                 }
    //             });
        
    //             if(findartist) {
    //                 const likedSongs = await this.prisma.liked_songs.update({
    //                     where: {
    //                         id: findartist.Liked_songs[0].id
    //                     }, data: {
    //                         music: {
    //                             music_id: [music_id]
    //                         }
    //                     }
    //                 })

    //                 if(!likedSongs) {
    //                     throw new HttpException("failed to add liked song!", HttpStatus.BAD_GATEWAY);
    //                 }

    //                 return likedSongs;
    //             } else {
    //                 throw new HttpException("no user found!", HttpStatus.NOT_FOUND);
    //             }
    //         }
    //     } catch(error) {
    //         throw new HttpException(error.message || "Failed to get liked song details", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async addMusicToLikedSongs(user: any, musicId: number) {
        try {
            // Check if the user is a regular user
            const findUser = await this.prisma.user.findUnique({
                where: {
                    email: user.email
                },
                include: {
                    Liked_songs: true
                }
            });
    
            if (findUser) {
                // User found, update the liked songs for the user
                return this.updateLikedSongs(findUser.Liked_songs[0]?.id, musicId);
            }
    
            // Check if the user is an artist
            const findArtist = await this.prisma.artist.findUnique({
                where: {
                    email: user.email
                },
                include: {
                    Liked_songs: true
                }
            });
    
            if (findArtist) {
                // Artist found, update the liked songs for the artist
                return this.updateLikedSongs(findArtist.Liked_songs[0]?.id, musicId);
            }
    
            // Neither user nor artist found
            throw new HttpException("User or artist not found!", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException(error.message || "Failed to add music to liked songs", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    private async updateLikedSongs(likedSongsId: number | undefined, musicId: number) {
        if (!likedSongsId) {
            throw new HttpException("Liked songs not found!", HttpStatus.NOT_FOUND);
        }
    
        const existingLikedSongsRaw = await this.prisma.liked_songs.findUnique({
            where: { id: likedSongsId }
        });
    
        
        const existingLikedSongs = Array.isArray(existingLikedSongsRaw?.music)
            ? existingLikedSongsRaw?.music.map(String) 
            : [];
    
        
        if (existingLikedSongs.includes(musicId.toString())) {
            throw new HttpException("Music already exists in liked songs!", HttpStatus.CONFLICT);
        }
    
        
        existingLikedSongs.push(musicId.toString());
    
        return this.prisma.liked_songs.update({
            where: { id: likedSongsId },
            data: { music: existingLikedSongs }
        });
    }

    async deletemusictolikedsongs(user: any, musicId: number) {
        try {
            // Check if the user is a regular user
            const findUser = await this.prisma.user.findUnique({
                where: {
                    email: user.email
                },
                include: {
                    Liked_songs: true
                }
            });
    
            if (findUser) {
                // User found, update the liked songs for the user
                return this.deleteMusicFromLikedSongs(findUser.Liked_songs[0]?.id, musicId);
            }
    
            // Check if the user is an artist
            const findArtist = await this.prisma.artist.findUnique({
                where: {
                    email: user.email
                },
                include: {
                    Liked_songs: true
                }
            });
    
            if (findArtist) {
                // Artist found, update the liked songs for the artist
                return this.deleteMusicFromLikedSongs(findArtist.Liked_songs[0]?.id, musicId);
            }
    
            // Neither user nor artist found
            throw new HttpException("User or artist not found!", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException(error.message || "Failed to add music to liked songs", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async deleteMusicFromLikedSongs(likedSongsId: number | undefined, musicId: number) {
        if (!likedSongsId) {
            throw new HttpException("Liked songs not found!", HttpStatus.NOT_FOUND);
        }

        // Get the existing liked songs
        const existingLikedSongsRaw = await this.prisma.liked_songs.findUnique({
            where: { id: likedSongsId }
        });

        // Check if the music field is defined and is an array
        const existingLikedSongs = Array.isArray(existingLikedSongsRaw?.music)
            ? existingLikedSongsRaw?.music.map(String) // Convert each element to a string
            : [];

        // Check if the music ID exists in the array
        const musicIndex = existingLikedSongs.indexOf(musicId.toString());
        if (musicIndex === -1) {
            throw new HttpException("Music not found in liked songs!", HttpStatus.NOT_FOUND);
        }

        // Remove the music ID from the array
        existingLikedSongs.splice(musicIndex, 1);

        // Update the Liked_songs entry with the new array
        return this.prisma.liked_songs.update({
            where: { id: likedSongsId },
            data: { music: existingLikedSongs }
        });
    }

    async getmusicbyId(musicId: any) :Promise<any> {
        try {
            const music = await this.prisma.music.findUnique({
                where: {
                    id: Number(musicId)
                }
            });

            if(!music) {
                throw new HttpException("didn't found music!", HttpStatus.NOT_FOUND);
            }

            return music;
        } catch(error) {
            throw new HttpException("failed to get music!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
