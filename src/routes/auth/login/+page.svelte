<script>
	import { login } from '$lib/api/auth.remote';
	import { signInWithGoogle } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="container mx-auto mt-8 max-w-md">
	<h1 class="mb-8 text-2xl font-bold">Login</h1>
	<div class="my-8">
		<Button
			onclick={() => {
				signInWithGoogle();
			}}
			variant="outline"
			class="w-full">Sign In (Google)</Button
		>
	</div>
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
</div>
