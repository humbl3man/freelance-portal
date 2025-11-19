<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog as DialogPrimitive, type WithoutChild } from 'bits-ui';
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants, type ButtonVariant, type ButtonSize } from './ui/button';
	import { cn } from '$lib/utils';

	type Props = DialogPrimitive.RootProps & {
		buttonText?: Snippet;
		title: Snippet;
		description?: Snippet;
		contentProps?: WithoutChild<DialogPrimitive.ContentProps>;
		buttonVariant?: ButtonVariant;
		buttonSize?: ButtonSize;
		// ...other component props if you wish to pass them
	};

	let {
		open = $bindable(false),
		children,
		buttonText,
		contentProps,
		title,
		description,
		buttonVariant = 'default',
		buttonSize = 'default',
		...restProps
	}: Props = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	{#if buttonText}
		<Dialog.Trigger
			class={cn(
				buttonVariants({
					variant: buttonVariant,
					size: buttonSize
				}),
				'cursor-pointer'
			)}
		>
			{@render buttonText()}
		</Dialog.Trigger>
	{/if}
	<Dialog.Portal>
		<Dialog.Content class={'max-h-[calc(100vh-2rem)] overflow-y-auto'} {...contentProps}>
			<Dialog.Header>
				{@render title?.()}
			</Dialog.Header>
			{@render children?.()}
			<!-- <Dialog.Close>Close Dialog</Dialog.Close> -->
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
