import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { prismaservice } from "src/prisma/prisma.service";

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
    console.log("hii")
    const user = await this.prismaService.user.findUnique({
        where: {
            email: useremail
        }
    })

    if (user && user.password === password) {
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