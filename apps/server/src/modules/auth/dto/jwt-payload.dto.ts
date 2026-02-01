import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  sub: z.string(),
  email: z.email(),
  fullName: z.string(),
  isOnboarded: z.boolean(),
});

export type JwtPayloadSchema = z.infer<typeof JwtPayloadSchema>;
