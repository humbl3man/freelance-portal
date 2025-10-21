import { IS_EMAIL_PASSWORD_ENABLED } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user) {
		redirect(307, '/dashboard');
	}

	return {
		isEmailPasswordEnabled: Boolean(Number(IS_EMAIL_PASSWORD_ENABLED))
	};
};
