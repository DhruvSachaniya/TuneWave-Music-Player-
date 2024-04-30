import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { prismaservice } from "src/prisma/prisma.service";
import * as  argon2 from "argon2";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    authService: any;
    constructor(
        private readonly prismaService: prismaservice,
    ) {
        super();
    }

    // async validate(username: string, password: string): Promise<any> {
    //     console.log("hii")
    //     const user = await this.authService.validateUser(username, password);
    //     if (!user) {
    //       return null;
    //     }
    //     return user;
    //   }
    

  async validate(useremail: string, password: string): Promise<any> {
    console.log("logged in")
    const user = await this.prismaService.user.findUnique({
        where: {
            email: useremail
        }
    })

    if(user) {
        var match_hash = await argon2.verify(user.password, password);
    }
    
    // if (user && user.password === password) {
    if(match_hash) {
        const { password, ...result } = user;
        return result;
    }

    if(!user) {
        const artist = await this.prismaService.artist.findUnique({
            where: {
                email: useremail
            }
        })

        if(artist) {
            // const artist_hash = await argon2.verify(artist.password, password);
            if(artist.password === password) {
                const {password, ...result} = artist;
                
                return result;
            } 
        } else {
            throw new NotFoundException()
        } 
    }

  }
}