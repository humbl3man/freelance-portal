import { query, getRequestEvent } from '$app/server';
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
