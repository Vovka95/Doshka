import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    required: true,
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    example: 'Password-1234',
  })
  @IsNotEmpty()
  password: string;
}
