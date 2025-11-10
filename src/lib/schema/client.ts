import { z } from 'zod/mini';

export const clientSchema = z.object({
	name: z.string().check(
		z.minLength(5, {
			message: 'Name must be at least 5 characters long'
		})
	),
	email: z.email({
		message: 'Please enter a valid email'
	}),
	company: z.optional(z.string()),
	phone: z.optional(z.string()),
	website: z.optional(z.string()),
	notes: z.optional(z.string())
});

export const updateClientSchema = z.object({
	id: z.string(),
	name: z.string().check(
		z.minLength(5, {
			message: 'Name must be at least 5 characters long'
		})
	),
	email: z.email({
		message: 'Please enter a valid email'
	}),
	company: z.optional(z.string()),
	phone: z.optional(z.string()),
	website: z.optional(z.string()),
	notes: z.optional(z.string()),
	archived: z.string()
});
