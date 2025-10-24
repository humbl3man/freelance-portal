<script lang="ts">
	import { page } from '$app/state';
	import { getUser, signOut } from '$lib/api/auth.remote';

	const { children } = $props();
	const user = await getUser();
</script>

<div class="mx-auto max-w-7xl">
	<header class="mb-8 flex items-center justify-between border-b border-black/20 bg-white py-6">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">
				Welcome, <span class="text-blue-600">{user.name}</span>
			</h1>
			<p class="mt-2 text-sm text-gray-500">
				Access your dashboard overview and manage your account.
			</p>
		</div>
		<nav class="flex items-center gap-4">
			<a
				href="/dashboard"
				class="font-medium text-gray-700 transition hover:text-blue-600"
				class:active={page.url.pathname === '/dashboard'}>Overview</a
			>
			<a
				href="/dashboard/clients"
				class="font-medium text-gray-700 transition hover:text-blue-600"
				class:active={page.url.pathname.includes('/dashboard/clients')}>Clients</a
			>
			<a
				href="/dashboard/invoices"
				class="font-medium text-gray-700 transition hover:text-blue-600"
				class:active={page.url.pathname.includes('/dashboard/invoices')}>Invoices</a
			>
			<form {...signOut}>
				<button
					class="ml-4 cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
					type="submit">Sign Out</button
				>
			</form>
		</nav>
	</header>
	<section>
		{@render children?.()}
	</section>
</div>

<style lang="postcss">
	@reference "../../app.css";
	.active {
		@apply text-blue-600;
	}
</style>
