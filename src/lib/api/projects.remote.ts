import { query, getRequestEvent, form } from '$app/server';
import { projectSchema } from '$lib/schema/project';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema/project';
import { eq } from 'drizzle-orm';

export const getProjects = query(async () => {
	const event = getRequestEvent();
	const projects = await db
		.select()
		.from(table.projects)
		.where(eq(table.projects.userId, event.locals.user.id));
	return projects;
});

export const createProject = form(projectSchema, async (project) => {
	const event = getRequestEvent();
	await db.insert(table.projects).values({
		id: crypto.randomUUID(),
		title: project.title,
		description: project.description,
		status: project.status,
		budget: project.budget,
		hourlyRate: project.hourlyRate,
		startDate: project.startDate,
		endDate: project.endDate,
		priority: project.priority,
		userId: event.locals.user.id,
		clientId: 'default-client-id' // Replace with actual client ID as needed
	});
});
