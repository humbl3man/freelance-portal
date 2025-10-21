import { IS_EMAIL_PASSWORD_ENABLED } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const isEmailPasswordEnabled = Boolean(Number(IS_EMAIL_PASSWORD_ENABLED)) || false;

	if (event.locals.user) {
		redirect(307, '/dashboard');
	}

	if (!isEmailPasswordEnabled) {
		redirect(307, '/auth/login');
	}
};
