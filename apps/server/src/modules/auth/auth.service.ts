import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { OAuthUserDto } from './dto/oauth-user.dto';
import { addDays } from 'src/common/utils/date.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithOAuth(user: OAuthUserDto) {
    const refreshToken = uuidv4();

    const authResult = await this.repository.upsertUser({
      ...user,
    });

    const expiresAt = addDays(7);
    const sessionData = {
      userId: authResult.user.id,
      authUserId: authResult.id,
      refreshToken,
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
      isOnboarded: authResult.user.isOnboarded,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const session = await this.repository.findSession(refreshToken);
    if (!session) {
      throw new UnauthorizedException();
    }
    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException();
    }

    const newRefreshToken = uuidv4();
    const newExpiresAt = addDays(7);
    const data = {
      sessionId: session.id,
      newRefreshToken,
      newExpiresAt,
    };
    const result = await this.repository.rotateRefreshToken(data);

    const newAccessToken = this.jwtService.sign({
      sub: result.user.id,
      email: result.authUser.email,
      fullName: result.user.fullName,
      isOnboarded: result.user.isOnboarded,
    });

    return {
      newRefreshToken,
      newAccessToken,
    };
  }

  async revokeToken(refreshToken: string) {
    const session = await this.repository.findSession(refreshToken)
    if(!session || session.revokedAt || session.expiresAt < new Date()) return

    await this.repository.revokeToken(session.id)
    return {success: true}
  } 
}
