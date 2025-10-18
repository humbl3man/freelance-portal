import { form, getRequestEvent, query } from '$app/server';
import { loginSchema, signupSchema } from '$lib/schema/auth';
import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth';

export const login = form(loginSchema, async (user, invalid) => {
	const { request } = getRequestEvent();
	try {
		await auth.api.signInEmail({
			body: {
				...user,
				rememberMe: true
			},
			headers: request.headers
		});
		redirect(307, '/dashboard');
	} catch (err) {
		if (err instanceof APIError) {
			if (err.status === 'UNAUTHORIZED') {
				invalid('Invalid email or password');
				console.log(err.status, err.message);
			}
			invalid('Login failed');
		} else {
			invalid('Login failed');
		}
	}
});

export const signOut = form(async () => {
	const { request } = getRequestEvent();
	await auth.api.signOut({
		headers: request.headers
	});
	redirect(303, '/');
});

export const signUp = form(signupSchema, async (user, invalid) => {
	try {
		await auth.api.signUpEmail({
			body: user
		});
	} catch (err) {
		if (err instanceof APIError) {
			invalid("Sorry, we couldn't create your account. Please check your details and try again.");
			console.log(err.status, err.message);
		} else {
			invalid('An unexpected error occurred. Please try again.');
		}
	}
	redirect(307, '/dashboard');
});

export const getUser = query(async () => {
	const { locals } = getRequestEvent();
	if (!locals.user) {
		redirect(307, '/auth/login');
	}

	return locals.user;
});
