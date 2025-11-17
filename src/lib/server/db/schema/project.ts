import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { user } from './auth';
import { client } from './client';

export const projects = sqliteTable('projects', {
	id: text('id').primaryKey().notNull(),

	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),

	clientId: text('client_id')
		.notNull()
		.references(() => client.id, { onDelete: 'cascade' }),

	title: text('title').notNull(),
	description: text('description'),

	status: text('status', {
		enum: ['prospect', 'active', 'blocked', 'completed', 'archived']
	})
		.default('prospect')
		.notNull(),

	budget: real('budget'), // optional fixed-price budget
	hourlyRate: real('hourly_rate'), // optional hourly rate override

	startDate: integer('start_date'), // timestamps (ms)
	endDate: integer('end_date'),

	priority: integer('priority').default(1), // 1=low, 2=normal, 3=high

	createdAt: integer('created_at').notNull(),
	updatedAt: integer('updated_at').notNull()
});

export const projectsRelations = relations(projects, ({ one }) => ({
	user: one(user, {
		fields: [projects.userId],
		references: [user.id]
	}),
	client: one(client, {
		fields: [projects.clientId],
		references: [client.id]
	})
}));
