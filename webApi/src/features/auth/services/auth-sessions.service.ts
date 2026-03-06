import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { AuthSession } from '../entity/auth-session.entity';

@Injectable()
export class AuthSessionsService {
    constructor(
        @InjectRepository(AuthSession)
        private readonly repository: Repository<AuthSession>,
    ) {}

    async createSession(data: Partial<AuthSession>) {
        const session = this.repository.create(data);
        return this.repository.save(session);
    }

    async findById(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    async rotateSession(id: string, oldHash: string, newHash: string) {
        const response = await this.repository.update(
            { id, refreshTokenHash: oldHash, revokedAt: IsNull() },
            { refreshTokenHash: newHash, rotatedAt: new Date() },
        );

        return !!response.affected;
    }

    async revokeSession(id: string) {
        await this.repository.update(id, { revokedAt: new Date() });
    }

    async revokeAllUserSessions(userId: string) {
        await this.repository.update(
            { userId, revokedAt: IsNull() },
            { revokedAt: new Date() },
        );
    }
}
