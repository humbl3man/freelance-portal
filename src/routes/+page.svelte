<script>
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	const { data } = $props();
	const { isEmailPasswordEnabled } = data;
</script>

{#snippet loginOptionsWithoutEmailPassword()}
	<div class={cn('grid items-center justify-center')}>
		<a
			href="/auth/login"
			class={`cursor-pointer ${buttonVariants({
				variant: 'default',
				size: 'lg'
			})}`}
		>
			Get Started
		</a>
		{#if isEmailPasswordEnabled}{/if}
	</div>
{/snippet}

{#snippet loginOptionsWithEmailPassword()}
	<div class={cn('grid grid-cols-2 gap-2')}>
		<a
			href="/auth/signup"
			class={`cursor-pointer ${buttonVariants({
				variant: 'outline'
			})}`}>Sign Up</a
		>
		<a
			href="/auth/login"
			class={`cursor-pointer ${buttonVariants({
				variant: 'default'
			})}`}
		>
			Login
		</a>
	</div>
{/snippet}

<div class="flex h-dvh items-center justify-center bg-blue-50">
	<div>
		<h1 class="mb-8 text-5xl font-semibold">Freelance Management Portal</h1>
		{#if isEmailPasswordEnabled}
			{@render loginOptionsWithEmailPassword()}
		{:else}
			{@render loginOptionsWithoutEmailPassword()}
		{/if}
	</div>
</div>
