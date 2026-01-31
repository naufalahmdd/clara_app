import type { Request, Response } from 'express';
import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Redirect()
  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { isOnboarded, accessToken, refreshTokenHash } =
      await this.service.loginWithOAuth(req.user);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
    };
    res.cookie('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('refresh_token_hash', refreshTokenHash, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const redirectUrl = isOnboarded
      ? `${process.env.FRONTEND_URL}/dashboard`
      : `${process.env.FRONTEND_URL}/get-started`;
    return { url: redirectUrl };
  }
}
