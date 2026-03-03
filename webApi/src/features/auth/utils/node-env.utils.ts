import { ConfigService } from '@nestjs/config';

export const getIsProdEnv = (configService: ConfigService) =>
  configService.get('NODE_ENV') === 'production';
