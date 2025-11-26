import { z } from 'zod/mini';

export const projectSchema = z.object({
	id: z.string(),
	title: z.string().check(
		z.minLength(2, {
			message: 'Title must be at least 2 characters long'
		})
	),
	description: z.string().check(
		z.minLength(5, {
			message: 'Description must be at least 5 characters long'
		})
	),
	status: z.enum(['prospect', 'active', 'blocked', 'completed', 'archived']),
	budget: z.optional(
		z.number().check(
			z.minimum(0, {
				message: 'Budget must be at least 0'
			}),
			z.maximum(1000000, {
				message: 'Budget must be at most 1000000'
			})
		)
	),
	hourlyRate: z.optional(
		z.number().check(
			z.minimum(0, {
				message: 'Hourly rate must be at least 0'
			}),
			z.maximum(1000, {
				message: 'Hourly rate must be at most 1000'
			})
		)
	),
	startDate: z.optional(z.number()),
	endDate: z.optional(z.number()),
	priority: z.number()
});
