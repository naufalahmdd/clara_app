import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpsertUserDto } from './dto/upsert-user.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertUser(user: UpsertUserDto) {
    return await this.prisma.authUser.upsert({
      where: {
        email: user.email,
      },
      update: {
        refreshTokenHash: user.refreshTokenHash,
        lastLoginAt: new Date(),
        user: {
          update: {
            fullName: user.fullName,
            avatarUrl: user.avatarUrl,
          },
        },
      },
      create: {
        providerId: user.providerId,
        provider: user.provider,
        email: user.email,
        refreshTokenHash: user.refreshTokenHash,
        lastLoginAt: new Date(),
        user: {
          create: {
            fullName: user.fullName,
            avatarUrl: user.avatarUrl,
            isOnboarded: false,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async logOut(userId: string) {
    return await this.prisma.authUser.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }
}
