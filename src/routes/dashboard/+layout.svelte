<script lang="ts">
	import AppNav from '$lib/components/AppNav.svelte';

	const { children } = $props();
</script>

<div class="mx-auto max-w-7xl">
	<header class="mb-8 flex items-center justify-between border-b border-black/20 bg-white py-6">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Freelance Manager</h1>
			<p class="mt-2 text-sm text-gray-500">
				Access your dashboard overview and manage your account.
			</p>
		</div>
		<AppNav />
	</header>
	<section>
		{@render children?.()}
	</section>
</div>
