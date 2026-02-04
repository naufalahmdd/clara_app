import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, createHash } from 'crypto';
import { OAuthUserDto } from './dto/oauth-user.dto';
import { addDays } from 'src/common/utils/date.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithOAuth(user: OAuthUserDto) {
    const refreshToken = randomBytes(32).toString('hex');
    const refreshTokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    const authResult = await this.repository.upsertUser({
      ...user,
    });

    const expiresAt = addDays(7);
    const sessionData = {
      userId: authResult.user.id,
      authUserId: authResult.id,
      refreshTokenHash,
      expiresAt,
    };
    await this.repository.createSession(sessionData);

    const accessToken = this.jwtService.sign({
      sub: authResult.user.id,
      email: authResult.email,
      fullName: authResult.user.fullName,
      isOnboarded: authResult.user.isOnboarded,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenCookie: string) {
    const refreshTokenHash = createHash('sha256')
      .update(refreshTokenCookie)
      .digest('hex');

    const session = await this.repository.findSession(refreshTokenHash);
    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException();
    }

    if (session.revokedAt) {
      throw new UnauthorizedException();
    }

    const newRefreshToken = randomBytes(32).toString('hex');
    const newRefreshTokenHash = createHash('sha256')
      .update(newRefreshToken)
      .digest('hex');
    const newExpiresAt = addDays(7);

    const data = {
      newRefreshTokenHash,
      newExpiresAt,
      oldRefreshTokenHash: refreshTokenHash,
    };
    const result = await this.repository.rotateRefreshToken(data);
    if (result.count === 0) {
      throw new UnauthorizedException();
    }

    const newAccessToken = this.jwtService.sign({
      sub: session.user.id,
      email: session.authUser.email,
      fullName: session.user.fullName,
      isOnboarded: session.user.isOnboarded,
    });

    return {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    };
  }

  async revokeToken(refreshTokenCookie: string) {
    const refreshTokenHash = createHash('sha256')
      .update(refreshTokenCookie)
      .digest('hex');

    const result = await this.repository.revokeToken(refreshTokenHash);
    return { success: result.count > 0 };
  }
}
