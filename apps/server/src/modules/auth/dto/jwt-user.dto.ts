import { z } from 'zod';

export const JwtUserSchema = z.object({
  sub: z.string(),
  email: z.email(),
  fullName: z.string(),
  isOnboarded: z.boolean(),
});

export type JwtUserDto = z.infer<typeof JwtUserSchema>;
