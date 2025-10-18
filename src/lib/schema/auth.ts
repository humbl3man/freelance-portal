import { z } from 'zod/mini';

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().check(z.minLength(8))
});

export const signupSchema = z.object({
	email: z.email(),
	password: z.string().check(z.minLength(8)),
	name: z.string().check(z.minLength(2))
});
