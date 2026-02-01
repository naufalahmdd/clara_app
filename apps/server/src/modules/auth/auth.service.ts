import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { OAuthUserDto } from './dto/oauth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithOAuth(user: OAuthUserDto) {
    const refreshToken = uuidv4();
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const authResult = await this.repository.upsertUser({
      ...user,
      refreshTokenHash,
    });
    const accessToken = this.jwtService.sign({
      sub: authResult.user.id,
      email: authResult.email,
      fullName: authResult.user.fullName,
      isOnboarded: authResult.user.isOnboarded,
    });
    return {
      isOnboarded: authResult.user.isOnboarded,
      accessToken,
      refreshTokenHash,
    };
  }

  async logOut(userId: string) {
    const logOutResult = await this.repository.logOut(userId);
    return true;
  }
}
