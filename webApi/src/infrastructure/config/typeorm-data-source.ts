import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl:
        process.env.DATABASE_SSL === 'true'
            ? { rejectUnauthorized: false }
            : undefined,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
});
