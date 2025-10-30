import { redirect } from '@sveltejs/kit';

export const load = (event) => {
	if (!event.locals.user) redirect(307, '/auth/login');
};
