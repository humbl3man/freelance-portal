<script lang="ts">
	import { deleteClient, getClients } from '$lib/api/clients.remote';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { APIError } from 'better-auth';
	import DeleteClientDialog from '$lib/components/DeleteClientDialog.svelte';
	import CustomDialog from '$lib/components/CustomDialog.svelte';
	import AddClientForm from './AddClientForm.svelte';
	import EditClientForm from './EditClientForm.svelte';
	import type { Client } from '$lib/types/client';
	import { toast } from 'svelte-sonner';
	import { dev } from '$app/environment';

	const clients = $derived(await getClients());
	let addClientDialogOpen = $state(false);
	let editClientDialogOpen = $state(false);
	let editClientData: Client | null = $state(null);

	if (dev) {
		$inspect('clients', clients);
	}

	async function handleDeleteClient(clientId: string) {
		try {
			await deleteClient(clientId);
			await getClients().withOverride((updateClients) => {
				return updateClients.filter((c) => c.id !== clientId);
			});
			toast.success('Client deleted');
		} catch (err) {
			if (err instanceof APIError) {
				console.log(err.status, err.message);
			}
			console.log(err);
			alert('Unable to delete');
		}
	}

	function resetEdit() {
		editClientDialogOpen = false;
		editClientData = null;
	}
</script>

<div class="px-4">
	<header class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold">Clients</h1>
		<CustomDialog open={addClientDialogOpen} onOpenChange={(open) => (addClientDialogOpen = open)}>
			{#snippet buttonText()}
				&plus; Add Client
			{/snippet}
			{#snippet title()}
				<div class="text-lg font-semibold">Add Client</div>
			{/snippet}
			<AddClientForm
				afterSubmit={() => {
					addClientDialogOpen = false;
				}}
			/>
		</CustomDialog>
	</header>

	<section class="mt-10">
		{#if clients.length}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head>Company</Table.Head>
						<Table.Head>Phone</Table.Head>
						<Table.Head>Website</Table.Head>
						<Table.Head>Notes</Table.Head>
						<Table.Head></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each clients as client (client.id)}
						<Table.Row>
							<Table.Cell>
								{client.name}
							</Table.Cell>
							<Table.Cell>{client.email}</Table.Cell>
							<Table.Cell>{client.company}</Table.Cell>
							<Table.Cell>{client.phone}</Table.Cell>
							<Table.Cell>{client.website}</Table.Cell>
							<Table.Cell>{client.notes}</Table.Cell>
							<Table.Cell>
								<div class="flex items-center justify-center gap-1">
									<Button
										size="sm"
										variant="outline"
										onclick={() => {
											editClientData = client;
											editClientDialogOpen = true;
										}}>Edit</Button
									>
									<DeleteClientDialog
										onConfirm={() => {
											handleDeleteClient(client.id);
										}}
									/>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<div class="flex min-h-[200px] flex-col items-center justify-center bg-slate-100 p-3">
				<div class="mb-3 text-xl font-semibold">You haven't added any clients yet</div>
				<div>To get started, click the "Add Client" button above.</div>
			</div>
		{/if}
	</section>
</div>

{#if editClientData}
	<CustomDialog
		open={editClientDialogOpen}
		onOpenChange={(open) => {
			editClientDialogOpen = open;
			if (!open) {
				editClientData = null;
			}
		}}
	>
		{#snippet title()}
			Update Client
		{/snippet}
		<EditClientForm client={editClientData} onCancel={resetEdit} />
	</CustomDialog>
{/if}
