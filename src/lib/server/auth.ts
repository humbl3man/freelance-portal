import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	IS_EMAIL_PASSWORD_ENABLED
} from '$env/static/private';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string
		},
		github: {
			clientId: GITHUB_CLIENT_ID as string,
			clientSecret: GITHUB_CLIENT_SECRET as string
		}
	},
	emailAndPassword: {
		enabled: Boolean(IS_EMAIL_PASSWORD_ENABLED)
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
