import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CleanupService } from './cleanup.service';

import { AuthSession } from '../../features/auth/entity/auth-session.entity';
import { UserToken } from '../../features/auth/entity/user-token.entity';
import { User } from '../../features/users/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthSession, UserToken, User])],
    providers: [CleanupService],
})
export class CleanupModule {}
