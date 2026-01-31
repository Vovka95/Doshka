import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from 'src/common/validators/match.validator';
import { AUTH_PASSWORD } from '../constants';

export class SignupDto {
  @ApiProperty({ description: 'First name', required: true, example: 'Test' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name', required: true, example: 'Test' })
  @IsNotEmpty()
  lastName: string;

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
  @MinLength(AUTH_PASSWORD.MIN_LENGTH, {
    message: AUTH_PASSWORD.MESSAGES.MIN_LENGTH,
  })
  @MaxLength(AUTH_PASSWORD.MAX_LENGTH, {
    message: AUTH_PASSWORD.MESSAGES.MAX_LENGTH,
  })
  @Matches(AUTH_PASSWORD.REGEX.LOWERCASE, {
    message: AUTH_PASSWORD.MESSAGES.LOWERCASE,
  })
  @Matches(AUTH_PASSWORD.REGEX.UPPERCASE, {
    message: AUTH_PASSWORD.MESSAGES.UPPERCASE,
  })
  @Matches(AUTH_PASSWORD.REGEX.NUMBER, {
    message: AUTH_PASSWORD.MESSAGES.NUMBER,
  })
  @Matches(AUTH_PASSWORD.REGEX.SPECIAL_CHAR, {
    message: AUTH_PASSWORD.MESSAGES.SPECIAL_CHAR,
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    required: true,
    example: 'Password-1234',
  })
  @Match('password', { message: AUTH_PASSWORD.MESSAGES.CONFIRM_MATCH })
  confirmPassword: string;
}
