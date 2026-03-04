import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1772654285985 implements MigrationInterface {
    name = 'InitSchema1772654285985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isEmailConfirmed" boolean NOT NULL DEFAULT false, "avatarUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_token_type_enum" AS ENUM('EMAIL_CONFIRM', 'PASSWORD_RESET')`);
        await queryRunner.query(`CREATE TABLE "user_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" "public"."user_token_type_enum" NOT NULL, "tokenHash" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "invalidatedAt" TIMESTAMP WITH TIME ZONE, "usedAt" TIMESTAMP, "sentAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dddcdb2ee94efe1ad80e95fb37" ON "user_token" ("userId", "type") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bc9d86dcccb78e70cb0cfd4b38" ON "user_token" ("type", "tokenHash") `);
        await queryRunner.query(`CREATE TABLE "auth_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "refreshTokenHash" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "rotatedAt" TIMESTAMP, "revokedAt" TIMESTAMP, "userAgent" character varying, "ip" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_19354ed146424a728c1112a8cbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_session" ADD CONSTRAINT "FK_c072b729d71697f959bde66ade0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_session" DROP CONSTRAINT "FK_c072b729d71697f959bde66ade0"`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918"`);
        await queryRunner.query(`DROP TABLE "auth_session"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc9d86dcccb78e70cb0cfd4b38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dddcdb2ee94efe1ad80e95fb37"`);
        await queryRunner.query(`DROP TABLE "user_token"`);
        await queryRunner.query(`DROP TYPE "public"."user_token_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
