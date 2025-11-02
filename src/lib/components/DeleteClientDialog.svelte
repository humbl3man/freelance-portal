<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import { TrashIcon } from '@lucide/svelte';
	type DeleteClientDialogProps = {
		onConfirm: () => void;
	};
	let { onConfirm }: DeleteClientDialogProps = $props();
	let open = $state(false);
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger
		title="Delete Client"
		onclick={() => {
			open = true;
		}}
		class={buttonVariants({
			variant: 'outline',
			size: 'sm'
		})}
	>
		<TrashIcon />
	</AlertDialog.Trigger>
	<AlertDialog.Portal>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure you want to delete this client?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete this client data from our
					servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => (open = false)}>No, cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					class={buttonVariants({
						variant: 'default'
					})}
					onclick={() => {
						onConfirm();
						open = false;
					}}>Yes, Delete</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
