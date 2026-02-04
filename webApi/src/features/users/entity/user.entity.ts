import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  refreshTokenHash?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  refreshTokenUpdatedAt: Date | null;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ type: 'varchar', nullable: true })
  emailConfirmTokenHash: string | null;

  @Column({ type: 'timestamp', nullable: true })
  emailConfirmTokenExpiresAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  emailConfirmSentAt: Date | null;

  @Column({ type: 'varchar', nullable: true })
  passwordResetTokenHash: string | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetTokenExpiresAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetSentAt: Date | null;

  @Column({ nullable: true })
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
