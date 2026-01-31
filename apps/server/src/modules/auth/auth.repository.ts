import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertUser({user, refreshTokenHash}: any) {
    return await this.prisma.authUser.upsert({
      where: {
        email: user.email,
      },
      update: {
        refreshTokenHash: refreshTokenHash,
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
        refreshTokenHash: refreshTokenHash,
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
}
