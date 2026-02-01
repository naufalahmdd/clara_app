import { z } from 'zod';

const ProviderSchema = z.enum(['google']);

export const OAuthUserSchema = z.object({
  providerId: z.string(),
  provider: ProviderSchema,
  email: z.email(),
  fullName: z.string(),
  avatarUrl: z.string(),
});

export type OAuthUserDto = z.infer<typeof OAuthUserSchema>;