import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { IsNull, Repository } from 'typeorm';
import { UserRole } from './enums/user-role.enum';
import { User } from './entities/user.entity';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: UserRole;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async findActiveById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id, isActive: true, deletedAt: IsNull() },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { email: email.toLowerCase(), deletedAt: IsNull() },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        passwordHash: true,
        role: true,
        isActive: true,
        isVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    const email = input.email.toLowerCase().trim();
    const existing = await this.usersRepo.findOne({
      where: { email },
      withDeleted: true,
    });

    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await this.hashPassword(input.password);

    const user = this.usersRepo.create({
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email,
      phone: input.phone?.trim() ?? null,
      passwordHash,
      role: input.role ?? UserRole.VENDEDOR,
      isActive: true,
      isVerified: false,
    });

    return this.usersRepo.save(user);
  }

  async verifyPassword(user: User, plainPassword: string): Promise<boolean> {
    return argon2.verify(user.passwordHash, this.applyPepper(plainPassword));
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.usersRepo.update(userId, { lastLoginAt: new Date() });
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id: userId, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(this.applyPepper(password), {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
  }

  private applyPepper(password: string): string {
    const pepper = this.config.get<string>('auth.bcryptPepper') ?? '';
    return `${password}${pepper}`;
  }
}
