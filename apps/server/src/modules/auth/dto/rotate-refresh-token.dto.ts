import { z } from 'zod';

export const RotateRefreshTokenSchema = z.object({
  sessionId: z.string(),
  newRefreshToken: z.string(),
  newExpiresAt: z.date(),
});

export type RotateRefreshTokenDto = z.infer<typeof RotateRefreshTokenSchema>;
