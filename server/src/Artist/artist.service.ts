import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { PlaylistMusicDto, songdto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: prismaservice) {}

  //for home page to show the all artist and thier music
  async getallartist(): Promise<any> {
    try {
      const getdata = await this.prisma.artist.findMany({
        include: {
          Music: true,
        },
      });

      if (!getdata) {
        throw new NotFoundException();
      }

      return getdata;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async getartistdetails(user: any): Promise<any> {
    try {
      const getplaylist = await this.prisma.artist.findUnique({
        where: {
          email: user.email,
        },
        include: {
          Music: true,
          Liked_songs: true,
          Artist_Playlist: true,
        },
      });

      if (!getplaylist) {
        throw new NotFoundException();
      }

      return getplaylist;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async uploadmusic(
    user: any,
    dto: songdto,
    files: { mp3: Express.Multer.File[]; image: Express.Multer.File[] },
  ) {
    try {
      const mp3File = files.mp3[0];
      const imageFile = files.image[0];
      const uploadsong = await this.prisma.music.create({
        data: {
          Artist: { connect: { id: user.id } },
          name: dto.name,
          description: dto.description,
          audio_file: mp3File.filename,
          music_photo: imageFile.filename,
        },
      });

      if (!uploadsong) {
        throw new HttpException(
          'error to upload music!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      return uploadsong;
    } catch (error) {
      console.error('Error uploading music:', error);
      throw new HttpException(
        'Failed to upload music',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //playlist route of artist
  async createartistplaylist(user: any, name: string): Promise<any> {
    try {
      const artist_Playlist = await this.prisma.artist_Playlist.create({
        data: {
          Artist: { connect: { id: user.id } },
          name: name,
        },
      });

      if (!artist_Playlist) {
        throw new HttpException(
          'error to create playlist!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      return artist_Playlist;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
  //come delete playlist by artist
  async deleteplaylist(user: any, artist_playlist_id: number) {
    try {
      const playlist = await this.prisma.artist_Playlist.findUnique({
        where: {
          id: Number(artist_playlist_id),
        },
        include: {
          Artist: true,
          musics: true,
        },
      });

      if (!playlist) {
        throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
      }

      if (playlist.ArtistId !== user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      //gonna need user_playlist_id
      const deleteplaylist = await this.prisma.artist_Playlist.delete({
        where: {
          id: Number(artist_playlist_id),
        },
      });

      if (!deleteplaylist) {
        throw new HttpException(
          'failed to deleteplaylist!',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }

      return deleteplaylist;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete music to playlist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //come update name of playlist by user
  async updateplaylistname(
    user: any,
    aritst_playlist_id: number,
    changed_name: string,
  ) {
    try {
      const playlist = await this.prisma.artist_Playlist.findUnique({
        where: {
          id: Number(aritst_playlist_id),
        },
        include: {
          Artist: true,
        },
      });

      if (!playlist) {
        throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
      }

      if (playlist.ArtistId !== user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const updateplaylistname = await this.prisma.artist_Playlist.update({
        where: {
          id: Number(aritst_playlist_id),
        },
        data: {
          name: changed_name,
        },
      });

      if (!updateplaylistname) {
        throw new HttpException(
          'error to update name!',
          HttpStatus.NOT_MODIFIED,
        );
      }

      return {
        updated_data: updateplaylistname,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update name of playlist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addMusicToPlaylist(user: any, dto: PlaylistMusicDto) {
    try {
      // Check if the user owns the playlist or has permission to modify it
      const playlist = await this.prisma.artist_Playlist.findUnique({
        where: {
          id: Number(dto.artist_playlist_id),
        },
        include: {
          Artist: true,
          musics: true,
        },
      });

      if (!playlist) {
        throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
      }

      if (playlist.ArtistId !== user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const updatedPlaylist = await this.prisma.artist_Playlist.update({
        where: {
          id: Number(dto.artist_playlist_id),
        },
        data: {
          musics: { connect: { id: Number(dto.music_id) } },
        },
      });

      return updatedPlaylist;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to add music to playlist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //delteing music from playlist by user
  async deletefromplaylist(user: any, dto: PlaylistMusicDto) {
    try {
      //plylist_id , music_id
      const playlist = await this.prisma.artist_Playlist.findUnique({
        where: {
          id: Number(dto.artist_playlist_id),
        },
        include: {
          Artist: true,
          musics: true,
        },
      });

      if (!playlist) {
        throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
      }

      if (playlist.ArtistId !== user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const deletemusic = await this.prisma.artist_Playlist.update({
        where: {
          id: Number(dto.artist_playlist_id),
        },
        data: {
          musics: {
            disconnect: { id: Number(dto.music_id) },
          },
        },
      });

      return deletemusic;
    } catch (error) {
      throw new HttpException(
        error.meassage || 'failed to delete music to playlist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getplaylistbyid(playlistid: number): Promise<any> {
    try {
      const playlist_data = await this.prisma.artist_Playlist.findUnique({
        where: {
          id: Number(playlistid),
        },
        include: {
          musics: true,
        },
      });

      if (!playlist_data) {
        throw new HttpException('not playlistt found!', HttpStatus.NOT_FOUND);
      }

      return playlist_data;
    } catch (error) {
      throw new HttpException(
        error || 'error to finding palylistbyid!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getartistbyid(artistid: number): Promise<any> {
    try {
      const findartistbyid = await this.prisma.artist.findUnique({
        where: {
          id: Number(artistid),
        },
        include: {
          Music: true,
        },
      });

      if (!findartistbyid) {
        throw new HttpException('no artist found!', HttpStatus.NOT_FOUND);
      }

      return findartistbyid;
    } catch (error) {
      throw new HttpException(
        error || 'eror to finding artistbyid!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
