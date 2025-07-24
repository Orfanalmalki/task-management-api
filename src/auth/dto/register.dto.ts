import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'User Name' })
  @MinLength(1)
  name: string;

  @ApiProperty({ example: ' YOUR OWN PASSWORD' })
  @MinLength(6)
  password: string;
}
