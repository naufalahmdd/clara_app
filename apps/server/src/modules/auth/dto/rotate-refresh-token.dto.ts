import { z } from 'zod';

export const RotateRefreshTokenSchema = z.object({
  newRefreshTokenHash: z.string(),
  newExpiresAt: z.date(),
  oldRefreshTokenHash: z.string()
});

export type RotateRefreshTokenDto = z.infer<typeof RotateRefreshTokenSchema>;
