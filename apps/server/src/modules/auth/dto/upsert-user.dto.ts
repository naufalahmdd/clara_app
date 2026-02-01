import { z } from 'zod';
import { OAuthUserSchema } from './oauth-user.dto';

export const UpsertUserSchema = OAuthUserSchema.extend({
  refreshTokenHash: z.string(),
});

export type UpsertUserDto = z.infer<typeof UpsertUserSchema>