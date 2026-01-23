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

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async updateRefreshToken(userId: string, hashedToken: string): Promise<void> {
    await this.userRepository.update(userId, {
      hashedRefreshToken: hashedToken,
    });
  }

  async findById(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  toResponseDto(user: User): UserResponseDto {
    const { id, email, firstName, lastName, avatarUrl } = user;
    return { id, email, firstName, lastName, avatarUrl };
  }
}
