import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh Token',
    required: true,
    example: 'dfkladsjflijewpfijalsjf.asfd',
  })
  @IsNotEmpty()
  refreshToken: string;
}
