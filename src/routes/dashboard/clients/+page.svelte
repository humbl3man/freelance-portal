<script lang="ts">
	import { archiveClient, deleteClient, getClients } from '$lib/api/clients.remote';
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
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';
	import * as Alert from '$lib/components/ui/alert';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Filter, FilterIcon, FilterX, Funnel } from '@lucide/svelte';

	const filterLabel = {
		ARCHIVED_ONLY: 'Archived Only',
		NON_ARCHIVED_ONLY: 'Active only',
		ALL: 'All'
	};

	const filterValue = {
		ARCHIVED_ONLY: 'archived-only',
		NON_ARCHIVED_ONLY: 'non-archived-only',
		ALL: 'all'
	};

	const clients = $derived(await getClients());
	let addClientDialogOpen = $state(false);
	let editClientDialogOpen = $state(false);
	let editClientData: Client | null = $state(null);
	const defaultFilterValue = filterValue.ALL;
	let selectedFilter = $state(defaultFilterValue);
	let getSelectedFilterLabel = () => {
		switch (selectedFilter) {
			case filterValue.ARCHIVED_ONLY:
				return filterLabel.ARCHIVED_ONLY;
			case filterValue.NON_ARCHIVED_ONLY:
				return filterLabel.NON_ARCHIVED_ONLY;
			case filterValue.ALL:
			default:
				return filterLabel.ALL;
		}
	};
	let selectedFilterLabel = $derived(getSelectedFilterLabel());
	let showArchivedFilterWarning = $derived.by(
		() => selectedFilterLabel === filterLabel.ARCHIVED_ONLY
	);

	const getFilteredClients = () => {
		switch (selectedFilter) {
			case 'archived-only':
				return clients.filter((c) => c.archived);
			case 'non-archived-only':
				return clients.filter((c) => !c.archived);
			case 'all':
			default:
				return clients.sort((clientA, clientB) => {
					if (clientA.archived) return 1;
					if (clientB.archived) return -1;
					return 0;
				});
		}
	};
	const filteredClients = $derived(getFilteredClients());

	if (dev) {
		$inspect('clients', clients);
	}

	function onAddDialogChange(open: boolean) {
		addClientDialogOpen = open;
	}

	function openEditDialogFor(client: Client) {
		editClientData = client;
		editClientDialogOpen = true;
	}

	function onEditDialogChange(open: boolean) {
		editClientDialogOpen = open;
		if (!open) {
			editClientData = null;
		}
	}

	async function handleDeleteClientConfirmed(clientId: string) {
		try {
			await deleteClient(clientId);
			await getClients().withOverride((updateClients) => {
				return updateClients.filter((c) => c.id !== clientId);
			});
			toast.success('Client deleted');
		} catch (error) {
			if (error instanceof APIError) {
				console.error('Delete client failed', { status: error.status, message: error.message });
			} else {
				console.error('Delete client failed', error);
			}
			toast.error('Unable to delete client');
		}
	}

	function resetEdit() {
		editClientDialogOpen = false;
		editClientData = null;
	}

	async function handleArchiveClient(id: string, value = true) {
		try {
			await archiveClient({ id, value });
			toast.success(value ? 'Client archived' : 'Client removed from archived');
		} catch (err) {
			toast.error('Unable to process your request');
		}
	}
</script>

{#if showArchivedFilterWarning}
	<div class="mx-auto max-w-lg px-2">
		<Alert.Root>
			<Alert.Title>Psst...</Alert.Title>
			<Alert.Description>You are viewing archived messages.</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<div class="px-4">
	<header class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold">Clients</h1>
		<CustomDialog open={addClientDialogOpen} onOpenChange={onAddDialogChange}>
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

	<div class="my-2 flex items-center gap-2 bg-slate-50 p-2">
		<div class="text-sm">
			<Funnel width="11" height="11" />
			<span class="sr-only">Filter By</span>
		</div>
		<Select.Root
			type="single"
			value={selectedFilter}
			onValueChange={(v) => {
				selectedFilter = v;
			}}
		>
			<Select.Trigger class="w-[180px]">{selectedFilterLabel}</Select.Trigger>
			<Select.Content id="filter">
				<Select.Item value={filterValue.ALL}>{filterLabel.ALL}</Select.Item>
				<Select.Item value={filterValue.NON_ARCHIVED_ONLY}
					>{filterLabel.NON_ARCHIVED_ONLY}</Select.Item
				>
				<Select.Item value={filterValue.ARCHIVED_ONLY}>{filterLabel.ARCHIVED_ONLY}</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>

	<section class="mt-10">
		{#if filteredClients.length}
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
					{#each filteredClients as client (client.id)}
						{@const archivedClass = cn({ 'text-black/60': client.archived })}
						<Table.Row>
							<Table.Cell class={archivedClass}>
								{client.name}{client.archived ? '(Archived)' : ''}
							</Table.Cell>
							<Table.Cell class={archivedClass}>{client.email}</Table.Cell>
							<Table.Cell class={archivedClass}>
								{client.company}</Table.Cell
							>
							<Table.Cell class={archivedClass}>{client.phone}</Table.Cell>
							<Table.Cell class={archivedClass}>{client.website}</Table.Cell>
							<Table.Cell class={archivedClass}>{client.notes}</Table.Cell>
							<Table.Cell>
								<div class="flex items-center justify-end gap-1">
									<Button size="sm" variant="outline" onclick={() => openEditDialogFor(client)}
										>Edit</Button
									>
									{#if !client.archived}
										<Button
											size="sm"
											variant="outline"
											onclick={() => {
												handleArchiveClient(client.id);
											}}
										>
											Archive
										</Button>
									{:else}
										<Button
											size="sm"
											variant="outline"
											onclick={() => {
												handleArchiveClient(client.id, false);
											}}
										>
											Un-archive
										</Button>
									{/if}
									<DeleteClientDialog onConfirm={() => handleDeleteClientConfirmed(client.id)} />
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<div class="flex min-h-[200px] flex-col items-center justify-center bg-slate-100 p-3">
				{#if selectedFilter === filterValue.ALL}
					<div class="mb-3 text-xl font-semibold">You haven't added any clients yet</div>
					<div>To get started, click the "Add Client" button above.</div>
				{:else}
					<div class="mb-3 text-xl font-semibold">No clients match the selected filter.</div>
					<div>
						Try adjusting your filter options or <span class="font-semibold">add a new client</span>
						to see them appear here.
					</div>
				{/if}
			</div>
		{/if}
	</section>
</div>

{#if editClientData}
	<CustomDialog open={editClientDialogOpen} onOpenChange={onEditDialogChange}>
		{#snippet title()}
			Update Client
		{/snippet}
		<EditClientForm client={editClientData} onCancel={resetEdit} />
	</CustomDialog>
{/if}
