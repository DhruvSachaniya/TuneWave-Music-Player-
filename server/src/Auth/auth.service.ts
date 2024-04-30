import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { prismaservice } from "src/prisma/prisma.service";
import { UserSignupdto } from "./dto/usersignup.dto";
import { artistsignupdto } from "./dto/artistsignup.dto";
import { JwtService } from "@nestjs/jwt";
import * as  argon2 from "argon2";

@Injectable()
export class authservice {
    constructor(private prisma: prismaservice, private jwt: JwtService) { }

    async usersignuppage(dto: UserSignupdto): Promise<any> {
        try {
            if (!dto) {
                throw new HttpException("dto is required for signup!", HttpStatus.NO_CONTENT);
            }

            const confimemail = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (confimemail) {
                throw new HttpException("email is already exits!", HttpStatus.CONFLICT);
            }

            // password has to be decrypted

            const hashedPassword = await argon2.hash(dto.password);

            const createuser = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,
                    role: "user"
                },
            })

            if (!createuser) {
                throw new HttpException("error to create user!", HttpStatus.BAD_REQUEST);
            }

            //create liked songs with signup
            const createlikedsong = await this.prisma.liked_songs.create({
                data: {
                    User: { connect: { id: createuser.id } }
                }
            })

            if (!createlikedsong) {
                throw new HttpException("error to create liked song!", HttpStatus.BAD_REQUEST);
            }

            return createuser;

        } catch (error) {
            throw new HttpException(error, HttpStatus.FORBIDDEN);
        }

    }

    async artistsignuppage(dto: artistsignupdto, file: any): Promise<any> {
        try {
            const image_name = file.filename;


            const confimemail = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (confimemail) {
                throw new HttpException("email is already exits!", HttpStatus.CONFLICT);
            }

            if (dto.email === "" || dto.password === "") {
                throw new HttpException("field cant be empty!", HttpStatus.BAD_REQUEST);
            }

            // password will need to be encrypet

            const artist_hash = await argon2.hash(dto.password);

            const createartist = await this.prisma.artist.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: artist_hash,
                    role: "artist",
                    album_photo: image_name
                }
            })

            if (!createartist) {
                throw new HttpException("error to create artist account!", HttpStatus.BAD_REQUEST);
            }

            //create liked songs with signup
            const createlikedsong = await this.prisma.liked_songs.create({
                data: {
                    Artist: { connect: { id: createartist.id } }
                }
            })

            if (!createlikedsong) {
                throw new HttpException("error to create liked song!", HttpStatus.BAD_REQUEST);
            }

            return createartist;

        } catch (error) {
            throw new HttpException(error, HttpStatus.FORBIDDEN);
        }
    }

    async loginpage(user: any): Promise<any> {
        return {
            role: user.role,
            token: this.jwt.sign({ sub: user.id, email: user.email })
        };
    }


}