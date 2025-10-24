import { form, getRequestEvent, query } from '$app/server';
import { clientSchema } from '$lib/schema/client';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { APIError } from 'better-auth';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

export const addClient = form(clientSchema, async (client, invalid) => {
	const {
		locals: { user }
	} = getRequestEvent();
	try {
		await db.insert(table.client).values({
			id: randomUUID(),
			userId: user.id,
			name: client.name,
			email: client.email,
			company: client.company,
			phone: client.phone,
			website: client.website,
			notes: client.notes,
			archived: false
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

export const getClients = query(async () => {
	const {
		locals: { user }
	} = getRequestEvent();

	const result = await db.select().from(table.client).where(eq(table.client.userId, user.id));
	return result;
});
