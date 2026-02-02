import type { Request, Response } from 'express';
import type { JwtUserDto } from './dto/jwt-user.dto';
import type { OAuthUserDto } from './dto/oauth-user.dto';
import {
  Controller,
  Get,
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
    const { isOnboarded, accessToken, refreshToken } =
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
    res.cookie('refresh_token', refreshToken, {
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

  @Post('/refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    const { newAccessToken, newRefreshToken } =
      await this.service.refreshToken(refreshToken);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    res.cookie('access_token', newAccessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('refresh_token', newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  @Redirect()
  @Post('/log-out')
  async logOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = await req.cookies['refresh_token'];
    const result = await this.service.revokeToken(refreshToken);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    res.clearCookie('access_token', { ...cookieOptions });
    res.clearCookie('refresh_token', { ...cookieOptions });

    return result;
  }
}
