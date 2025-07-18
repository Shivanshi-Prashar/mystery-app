import { z } from 'zod'

export const signInSchema = z.object({
    identifier: z.string().min(1, 'Email or username is required'),
    password: z.string().min(1, 'Password is required')
})

export type SignInFormData = z.infer<typeof signInSchema>
