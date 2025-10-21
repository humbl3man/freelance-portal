import { createAuthClient } from 'better-auth/svelte';
export const authClient = createAuthClient({
	baseURL: 'http://localhost:5173'
});

export const signInWithGoogle = async () => {
	await authClient.signIn.social({
		provider: 'google'
	});
};

export const signInWithGithub = async () => {
	await authClient.signIn.social({
		provider: 'github'
	});
};
