import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.trim().toLowerCase() },
    });
  }

  async findByEmailConfirmTokenHash(hash: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { emailConfirmTokenHash: hash },
    });
  }

  async findByPasswordResetTokenHash(hash: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { passwordResetTokenHash: hash },
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(userId: string, data: Partial<User>): Promise<void> {
    await this.userRepository.update(userId, data);
  }

  mapToUserResponse(user: User): UserResponseDto {
    const { id, email, firstName, lastName, avatarUrl } = user;
    return { id, email, firstName, lastName, avatarUrl };
  }
}
