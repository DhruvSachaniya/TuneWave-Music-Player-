import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { authservice } from "./auth.service";
import { UserSignupdto } from "./dto/usersignup.dto";
import { artistsignupdto } from "./dto/artistsignup.dto";
import { extname } from "path";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { LocalAuthGuard } from "./guard";


const image_storage = diskStorage({
    destination: './uploads/artist_photos',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = extname(file.originalname);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${name}-${randomName}${extension}`);
    },
});

@Controller("auth")
export class authcontroller {
    constructor(private authservice: authservice) { }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@Request() req): Promise<any> {
        return await this.authservice.loginpage(req.user)
    }

    @Post("signup/user")
    usersignuppage(@Body() dto: UserSignupdto) {
        return this.authservice.usersignuppage(dto);
    }

    @Post("signup/artist")
    @UseInterceptors(FileInterceptor('image', { storage: image_storage }))
    async artistsignuppage(
        @UploadedFile() image,
        @Body("name") name: string,
        @Body("email") email: string,
        @Body("password") password: string
    ): Promise<any> {

        const Artistsignupdto: artistsignupdto = {
            name: name,
            email: email,
            password: password

        }

        const saveddata = await this.authservice.artistsignuppage(Artistsignupdto, image);
        return {
            meassge: "account has been created successfully!", image: saveddata
        }
    }
}
