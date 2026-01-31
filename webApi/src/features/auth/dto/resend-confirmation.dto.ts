import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendConfirmationDto {
  @ApiProperty({
    description: 'Email',
    required: true,
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;
}
