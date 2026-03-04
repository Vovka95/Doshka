import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configs: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  autoLoadEntities: true,
};

export default registerAs('typeormConfig', () => configs);
