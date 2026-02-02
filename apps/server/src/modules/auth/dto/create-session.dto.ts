import {z} from "zod"

export const CreateSessionSchema = z.object({
    userId: z.string(),
    authUserId: z.string(),
    refreshToken: z.string(),
    expiresAt: z.date(),
    userAgent: z.string().optional(),
    ipAddress: z.string().optional()
})

export type CreateSessionDto = z.infer<typeof CreateSessionSchema>