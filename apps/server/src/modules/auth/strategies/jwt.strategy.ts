import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserSchema } from '../dto/jwt-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: unknown) {
    const payloadParsed = JwtUserSchema.parse(payload);

    return {
      userId: payloadParsed.sub,
      email: payloadParsed.email,
      fullName: payloadParsed.fullName,
      isOnboarded: payloadParsed.isOnboarded,
    };
  }
}
