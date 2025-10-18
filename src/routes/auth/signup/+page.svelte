<script>
	import { signUp } from '$lib/api/auth.remote';
</script>

<div class="container mx-auto mt-8 max-w-md">
	<h1 class="mb-2 text-2xl font-bold">Sign Up</h1>
	<p class="mb-8 text-black/70">
		Create your free account to start managing your clients, projects, and invoices.
	</p>
	<form {...signUp} class="flex flex-col gap-4">
		<div>
			<label class="flex flex-col gap-2">
				<span class="font-bold">Name</span>
				<input class="rounded-sm" {...signUp.fields.name.as('text')} />
				{#each signUp.fields.name.issues() ?? [] as issue}
					<p class="text-red-500">{issue.message}</p>
				{/each}
			</label>
		</div>
		<div>
			<label class="flex flex-col gap-2">
				<span class="font-bold">Email</span>
				<input class="rounded-sm" {...signUp.fields.email.as('email')} />
				{#each signUp.fields.email.issues() ?? [] as issue}
					<p class="text-red-500">{issue.message}</p>
				{/each}
			</label>
		</div>
		<div>
			<label class="flex flex-col gap-2">
				<span class="font-bold">Password</span>
				<input class="rounded-sm" {...signUp.fields.password.as('password')} />
				{#each signUp.fields.password.issues() ?? [] as issue}
					<p class="text-red-500">{issue.message}</p>
				{/each}
			</label>
		</div>
		{#each signUp.fields.issues() ?? [] as serverIssue}
			<p class="mb-2 text-red-500">{serverIssue.message}</p>
		{/each}
		<div class="mt-4">
			<button
				class="w-full cursor-pointer rounded-sm bg-blue-600 p-2 text-white hover:bg-blue-500 disabled:opacity-25"
				type="submit"
				disabled={Boolean(signUp.pending)}>Sign Up</button
			>
		</div>
		<p class="mt-6 text-center">
			<span class="text-black/70">Already have an account?</span>
			<a href="/auth/login" class="underline">Login</a>
		</p>
	</form>
</div>
