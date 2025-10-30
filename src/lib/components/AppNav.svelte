<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { signOut } from '$lib/api/auth.remote';
	import { Button, buttonVariants } from './ui/button';
	import { page } from '$app/state';

	// const components: { title: string; href: string; description: string }[] = [
	// 	{
	// 		title: 'Alert Dialog',
	// 		href: '/docs/components/alert-dialog',
	// 		description:
	// 			'A modal dialog that interrupts the user with important content and expects a response.'
	// 	},
	// 	{
	// 		title: 'Hover Card',
	// 		href: '/docs/components/hover-card',
	// 		description: 'For sighted users to preview content available behind a link.'
	// 	},
	// 	{
	// 		title: 'Progress',
	// 		href: '/docs/components/progress',
	// 		description:
	// 			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
	// 	},
	// 	{
	// 		title: 'Scroll-area',
	// 		href: '/docs/components/scroll-area',
	// 		description: 'Visually or semantically separates content.'
	// 	},
	// 	{
	// 		title: 'Tabs',
	// 		href: '/docs/components/tabs',
	// 		description:
	// 			'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
	// 	},
	// 	{
	// 		title: 'Tooltip',
	// 		href: '/docs/components/tooltip',
	// 		description:
	// 			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
	// 	}
	// ];

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
		}
	];
</script>

<NavigationMenu.Root viewport={false}>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Link>
				{#snippet child()}
					<a href="/dashboard" class={navigationMenuTriggerStyle()}>Dashboard</a>
				{/snippet}
			</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Account</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="p-2">
					{#each accountOptions as option}
						<li>
							<NavigationMenu.Link class="w-full" active={page.url.pathname.includes(option.href)}>
								{#snippet child()}
									<a
										href={option.href}
										class={`${buttonVariants({
											variant: 'ghost',
											size: 'sm'
										})} w-full text-left`}>{option.title}</a
									>
								{/snippet}
							</NavigationMenu.Link>
						</li>
					{/each}
					<li>
						<form {...signOut}>
							<Button variant="ghost" type="submit" class="cursor-pointer">Sign Out</Button>
						</form>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
