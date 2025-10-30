<script>
	import { login } from '$lib/api/auth.remote';
	import { signInWithGithub, signInWithGoogle } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { GithubIcon } from '@lucide/svelte';

	const { data } = $props();
	const { isEmailPasswordEnabled } = data;
</script>

<div class="container mx-auto mt-8 max-w-md">
	<h1 class="mb-8 text-2xl font-bold">Login</h1>
	<div class="my-8 flex flex-col gap-4">
		<Button
			onclick={() => {
				signInWithGoogle();
			}}
			variant="secondary"
			size="lg"
			class="relative w-[220px] cursor-pointer justify-start overflow-hidden border-blue-50 bg-blue-500 pl-[59px] text-white hover:bg-blue-500"
		>
			<div
				class="absolute top-0 left-0 inline-flex h-full min-w-[40px] items-center justify-center bg-blue-50 p-2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 48 48">
					<path
						fill="#FFC107"
						d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
					></path><path
						fill="#FF3D00"
						d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
					></path><path
						fill="#4CAF50"
						d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
					></path><path
						fill="#1976D2"
						d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
					></path>
				</svg>
			</div>
			Continue with Google
		</Button>
		<Button
			onclick={() => {
				signInWithGithub();
			}}
			variant="default"
			size="lg"
			class="relative w-[220px] cursor-pointer justify-start overflow-hidden border pl-[59px] text-white"
		>
			<div
				class="absolute top-0 left-0 inline-flex h-full min-w-[40px] items-center justify-center bg-white p-2 text-black"
			>
				<GithubIcon />
			</div>
			Sign In With Github
		</Button>
	</div>
	{#if isEmailPasswordEnabled}
		<form {...login} class="flex flex-col gap-4">
			<div>
				<label class="flex flex-col gap-2">
					<span class="font-bold">Email</span>
					<input class="rounded-sm" {...login.fields.email.as('email')} />
					{#each login.fields.email.issues() ?? [] as issue}
						<p class="text-red-500">{issue.message}</p>
					{/each}
				</label>
			</div>
			<div>
				<label class="flex flex-col gap-2">
					<span class="font-bold">Password</span>
					<input class="rounded-sm" {...login.fields.password.as('password')} />
					{#each login.fields.password.issues() ?? [] as issue}
						<p class="text-red-500">{issue.message}</p>
					{/each}
				</label>
			</div>
			{#each login.fields.issues() ?? [] as serverIssue}
				<p class="mb-2 text-red-500">{serverIssue.message}</p>
			{/each}
			<div class="mt-4">
				<button
					class="w-full cursor-pointer rounded-sm bg-blue-600 p-2 text-white hover:bg-blue-500 disabled:opacity-25"
					type="submit"
					disabled={Boolean(login.pending)}>Login</button
				>
			</div>
			<p class="mt-6 text-center">
				<span class="text-black/70">Don't have an account?</span>
				<a href="/auth/signup" class="underline">Sign Up</a>
			</p>
		</form>
	{/if}
</div>
