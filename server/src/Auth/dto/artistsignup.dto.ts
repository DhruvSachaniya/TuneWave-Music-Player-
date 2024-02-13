import { IsEmail, IsNotEmpty } from "class-validator"

export class artistsignupdto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}