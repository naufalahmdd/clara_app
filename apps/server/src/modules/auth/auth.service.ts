import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithOAuth(user: any) {
    console.log('Data user:', user);

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
}
