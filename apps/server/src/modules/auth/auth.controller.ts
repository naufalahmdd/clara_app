import type { Request, Response } from 'express';
import type { JwtUserDto } from './dto/jwt-user.dto';
import type { OAuthUserDto } from './dto/oauth-user.dto';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
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

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.service.loginWithOAuth(
      req.user as OAuthUserDto,
    );

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

    return res.redirect(`${process.env.FRONTEND_URL}/auth/callback`);
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
    const refreshTokenCookie = req.cookies['refresh_token'];
    if (!refreshTokenCookie) {
      throw new UnauthorizedException();
    }
    const { accessToken, refreshToken } =
      await this.service.refreshToken(refreshTokenCookie);

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

    return { success: true };
  }

  @Post('/log-out')
  async logOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenCookie = req.cookies['refresh_token'];
    if(!refreshTokenCookie) {
      return {success: false}
    }
    const result = await this.service.revokeToken(refreshTokenCookie);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    res.clearCookie('access_token', { ...cookieOptions, maxAge: 0 });
    res.clearCookie('refresh_token', { ...cookieOptions, maxAge: 0 });

    return result;
  }
}
