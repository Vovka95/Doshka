import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './infrastructure/database/database.module';
import { EmailModule } from './infrastructure/email/email.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { CleanupModule } from './infrastructure/cleanup/cleanup.module';

@Module({
    imports: [
        DatabaseModule,
        EmailModule,
        AuthModule,
        UsersModule,
        ScheduleModule.forRoot(),
        CleanupModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
