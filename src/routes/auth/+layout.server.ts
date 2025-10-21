import { IS_EMAIL_PASSWORD_ENABLED } from '$env/static/private';

export const load = async () => {
	return {
		isEmailPasswordEnabled: Boolean(Number(IS_EMAIL_PASSWORD_ENABLED)) || false
	};
};
