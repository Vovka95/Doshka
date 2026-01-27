import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

type ApiError = { code: string; message: string };

export function throwUnauthorizedException(err: ApiError): never {
  throw new UnauthorizedException(err);
}
export function throwForbiddenException(err: ApiError): never {
  throw new ForbiddenException(err);
}
export function throwConflictException(err: ApiError): never {
  throw new ConflictException(err);
}
export function throwBadRequestException(err: ApiError): never {
  throw new BadRequestException(err);
}
