import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { OAuthUserDto } from './dto/oauth-user.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { RotateRefreshTokenDto } from './dto/rotate-refresh-token.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertUser(user: OAuthUserDto) {
    return await this.prisma.authUser.upsert({
      where: {
        email: user.email,
      },
      update: {
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

  async createSession(data: CreateSessionDto) {
    return await this.prisma.authSession.create({
      data,
    });
  }

  async findSession(refreshTokenHash: string) {
    return await this.prisma.authSession.findFirst({
      where: {
        refreshTokenHash: refreshTokenHash,
      },
      include: {
        user: true,
        authUser: true,
      },
    });
  }

  async rotateRefreshToken(data: RotateRefreshTokenDto) {
    return await this.prisma.authSession.updateMany({
      where: {
        refreshTokenHash: data.oldRefreshTokenHash,
      },
      data: {
        refreshTokenHash: data.newRefreshTokenHash,
        expiresAt: data.newExpiresAt,
      },
    });
  }

  async revokeToken(refreshTokenHash: string) {
    return await this.prisma.authSession.updateMany({
      where: {
        refreshTokenHash: refreshTokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}
