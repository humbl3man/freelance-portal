<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { signOut } from '$lib/api/auth.remote';
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
	};

	const accountOptions: ListItemProps[] = [
		{
			title: 'Clients',
			href: '/dashboard/clients'
		},
		{
			title: 'Invoices',
			href: '/dashboard/invoices'
		},
		{
			title: 'Projects',
			href: '/dashboard/projects'
		}
	];
</script>

<NavigationMenu.Root viewport={false}>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Link>
				{#snippet child()}
					<a
						href="/dashboard"
						class={cn(navigationMenuTriggerStyle(), {
							active: page.url.pathname === '/dashboard'
						})}>Dashboard</a
					>
				{/snippet}
			</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item openOnHover={false}>
			<NavigationMenu.Trigger>Account</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="flex flex-col gap-1 p-2">
					{#each accountOptions as option}
						<li>
							<NavigationMenu.Link>
								{#snippet child()}
									<a
										href={option.href}
										class={cn(
											buttonVariants({
												variant: 'ghost',
												size: 'sm'
											}),
											{
												active: page.url.pathname.includes(option.href)
											},
											'flex w-full items-center justify-start'
										)}>{option.title}</a
									>
								{/snippet}
							</NavigationMenu.Link>
						</li>
					{/each}
					<li>
						<form {...signOut}>
							<button
								type="submit"
								class={cn(
									buttonVariants({
										variant: 'ghost',
										size: 'sm'
									}),
									'cursor-pointer'
								)}>Sign Out</button
							>
						</form>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>

<style lang="postcss">
	@reference '../../app.css';
	.active {
		@apply bg-blue-50;
	}
</style>
