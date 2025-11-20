import { command, form, getRequestEvent, query } from '$app/server';
import { clientSchema, updateClientSchema } from '$lib/schema/client';
import { db } from '$lib/server/db';
import * as clientTable from '$lib/server/db/schema/client';
import * as projectTable from '$lib/server/db/schema/project';
import { ClientStatus } from '$lib/types/client';
import { error } from '@sveltejs/kit';
import { APIError } from 'better-auth';
import { randomUUID } from 'crypto';
import { and, eq, sql } from 'drizzle-orm';
import { z } from 'zod/mini';
import { delay } from '$lib/utils';

export const addClient = form(clientSchema, async (client) => {
	const event = getRequestEvent();
	try {
		await db.insert(clientTable.client).values({
			id: randomUUID(),
			userId: event.locals.user.id,
			name: client.name,
			email: client.email,
			company: client.company,
			phone: client.phone,
			website: client.website,
			notes: client.notes,
			status: ClientStatus.default
		});
		getClients().refresh();
		return {
			isSuccess: true
		};
	} catch (err) {
		if (err instanceof APIError) {
			console.log(err.message);
			return {
				error: 'We are unable to process your request. Please try again'
			};
		}
	}
});

export const deleteClient = command(z.string(), async (id) => {
	const event = getRequestEvent();
	await db
		.delete(clientTable.client)
		.where(and(eq(clientTable.client.id, id), eq(clientTable.client.userId, event.locals.user.id)));
});

export const getClients = query(async () => {
	const event = getRequestEvent();
	const result = await db
		.select()
		.from(clientTable.client)
		.where(eq(clientTable.client.userId, event.locals.user.id));
	return result;
});

export const getClient = query(z.string(), async (clientId) => {
	const event = getRequestEvent();
	const [client] = await db
		.select()
		.from(clientTable.client)
		.where(
			and(eq(clientTable.client.id, clientId), eq(clientTable.client.userId, event.locals.user.id))
		);

	if (!client) {
		error(404, 'Client Not Found');
	}

	return client;
});

export const updateClient = form(updateClientSchema, async (client) => {
	const event = getRequestEvent();

	await delay(300);
	try {
		await db
			.update(clientTable.client)
			.set(client)
			.where(
				and(
					eq(clientTable.client.id, client.id),
					eq(clientTable.client.userId, event.locals.user.id)
				)
			);
		return {
			isSuccess: true
		};
	} catch (err) {
		if (err instanceof APIError) {
			console.log(err.status, err.message);
			return {
				error: 'We are unable to process your request. Please try again'
			};
		}
	}
});

export const archiveClient = command(
	z.object({
		id: z.string(),
		value: z.string()
	}),
	async ({ id, value }) => {
		const event = getRequestEvent();
		try {
			await db
				.update(clientTable.client)
				.set({
					status: value
				})
				.where(
					and(eq(clientTable.client.id, id), eq(clientTable.client.userId, event.locals.user.id))
				);
			getClients().refresh();
		} catch (err) {
			if (err instanceof APIError) {
				console.log(err.message);
				return {
					error: 'We are unable to process your request. Please try again'
				};
			}
		}
	}
);

export const getClientStats = query(async () => {
	const event = getRequestEvent();
	const [result] = await db
		.select({
			totalClients: sql`count(*)`.mapWith(Number)
		})
		.from(clientTable.client)
		.where(eq(clientTable.client.userId, event.locals.user.id));
	return result.totalClients ?? 0;
});

export const getProjectStats = query(async () => {
	const event = getRequestEvent();
	const [result] = await db
		.select({
			totalProjects: sql`count(*)`.mapWith(Number)
		})
		.from(projectTable.projects)
		.where(eq(projectTable.projects.userId, event.locals.user.id));
	return result.totalProjects ?? 0;
});
