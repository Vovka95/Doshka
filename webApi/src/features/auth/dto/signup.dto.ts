import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from 'src/common/validators/match.validator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_VALIDATION_ERRORS,
  CONFIRM_PASSWORD_VALIDATIO_ERRORS,
} from 'src/common/constants/auth.constants';

export class SignupDto {
  @ApiProperty({ example: 'Test' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Test' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password-1234' })
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
  @Matches(PASSWORD_REGEX.lowercase, {
    message: PASSWORD_VALIDATION_ERRORS.lowercase,
  })
  @Matches(PASSWORD_REGEX.uppercase, {
    message: PASSWORD_VALIDATION_ERRORS.uppercase,
  })
  @Matches(PASSWORD_REGEX.number, {
    message: PASSWORD_VALIDATION_ERRORS.number,
  })
  @Matches(PASSWORD_REGEX.specialChar, {
    message: PASSWORD_VALIDATION_ERRORS.specialChar,
  })
  password: string;

  @ApiProperty({ example: 'Password-1234' })
  @Match('password', { message: CONFIRM_PASSWORD_VALIDATIO_ERRORS.match })
  confirmPassword: string;
}
