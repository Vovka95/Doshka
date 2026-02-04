import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../../common/validators/match.validator';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { AUTH_PASSWORD } from '../constants';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token',
    required: true,
    example: 'dsfjskdffjksldjfkjfkl',
  })
  @IsNotEmpty()
  token: string;

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
