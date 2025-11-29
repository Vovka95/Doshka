import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeormConfig from '../config/typeorm.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.backend',
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow<TypeOrmModuleOptions>('typeormConfig'),
    }),
  ],
  exports: [TypeOrmModule, ConfigModule],
})
export class DatabaseModule {}
