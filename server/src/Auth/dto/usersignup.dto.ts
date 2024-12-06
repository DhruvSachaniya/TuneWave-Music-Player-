import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignupdto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
