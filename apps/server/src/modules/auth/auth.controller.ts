import type { Request, Response } from 'express';
import type { JwtUserDto } from './dto/jwt-user.dto';
import type { OAuthUserDto } from './dto/oauth-user.dto';
import {
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { JwtGuard } from './guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';

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
      await this.service.loginWithOAuth(req.user as OAuthUserDto);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
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

  @Get('/profile')
  @UseGuards(JwtGuard)
  async getProfile(@User() user: JwtUserDto) {
    return user;
  }

  @Post('/log-out')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async logOut(
    @User('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.service.logOut(userId);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };
    res.clearCookie('access_token', { ...cookieOptions });
    res.clearCookie('refresh_token_hash', { ...cookieOptions });

    return { success: true };
  }
}
