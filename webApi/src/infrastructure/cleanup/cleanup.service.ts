import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class CleanupService {
    private readonly logger = new Logger(CleanupService.name);

    constructor(private readonly dataSource: DataSource) {}

    @Cron('0 0 3 * * *', {
        name: 'daily-db-cleanup',
        timeZone: 'Europe/Kyiv',
    })
    async handleDailyCleanup() {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query(`
        DELETE FROM auth_session
        WHERE (
          "expiresAt" < NOW()
          OR "revokedAt" IS NOT NULL
          OR "rotatedAt" IS NOT NULL
        )
        AND "createdAt" < NOW() - INTERVAL '7 days'
      `);

            await queryRunner.query(`
        DELETE FROM user_token
        WHERE (
          "expiresAt" < NOW()
          OR "usedAt" IS NOT NULL
          OR "invalidatedAt" IS NOT NULL
        )
        AND "createdAt" < NOW() - INTERVAL '7 days'
      `);

            await queryRunner.commitTransaction();
            this.logger.log('DB cleanup completed');
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(
                'DB cleanup failed',
                error instanceof Error ? error.stack : String(error),
            );
        } finally {
            await queryRunner.release();
        }
    }
}
