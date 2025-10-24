<script lang="ts">
	import { clientSchema } from '$lib/schema/client';
	import { CircleAlertIcon } from '@lucide/svelte';
	import { addClient, getClients } from '$lib/api/clients.remote';
	import { buttonVariants, Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Spinner } from '$lib/components/ui/spinner';
	import { Textarea } from '$lib/components/ui/textarea';

	const clients = $derived(await getClients());
	let addClientDialogOpen = $state(false);
</script>

<header class="flex items-center justify-between">
	<h1 class="text-bold text-center text-3xl">Clients page</h1>

	<Dialog.Root bind:open={addClientDialogOpen}>
		<Dialog.Trigger
			class={buttonVariants({
				variant: 'default'
			})}
			>&plus; Add New Client
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Content>
				<Dialog.Header class="text-2xl font-semibold">Add Client Information</Dialog.Header>
				<form
					{...addClient.preflight(clientSchema).enhance(async ({ submit, form }) => {
						await submit().updates(getClients());
						form.reset();
						addClientDialogOpen = false;
					})}
					oninput={() => addClient.validate()}
				>
					{#if addClient.result?.error}
						<Alert.Root variant="destructive" class="my-2">
							<CircleAlertIcon />
							<Alert.Title>{addClient.result.error}</Alert.Title>
						</Alert.Root>
					{/if}
					<Field.Group>
						<Field.Set>
							<Field.Field class="relative">
								<Field.Label for="name">Name</Field.Label>
								<Input {...addClient.fields.name.as('text')} id="name" autocomplete="off" />
								{#each addClient.fields.name.issues() ?? [] as issue (issue.message)}
									<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
								{/each}
							</Field.Field>
							<Field.Field class="relative">
								<Field.Label for="email">Email</Field.Label>
								<Input {...addClient.fields.email.as('email')} id="email" autocomplete="off" />
								{#each addClient.fields.email.issues() ?? [] as issue (issue.message)}
									<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
								{/each}
							</Field.Field>
							<Field.Field class="relative">
								<Field.Label for="company">Company</Field.Label>
								<Input {...addClient.fields.company.as('text')} id="company" autocomplete="off" />
								{#each addClient.fields.company.issues() ?? [] as issue (issue.message)}
									<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
								{/each}
							</Field.Field>
							<Field.Field class="relative">
								<Field.Label for="phone">Phone</Field.Label>
								<Input {...addClient.fields.phone.as('text')} id="phone" autocomplete="off" />
								{#each addClient.fields.phone.issues() ?? [] as issue (issue.message)}
									<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
								{/each}
							</Field.Field>
							<Field.Field class="relative">
								<Field.Label for="website">Website</Field.Label>
								<Input {...addClient.fields.website.as('url')} id="website" autocomplete="off" />
								{#each addClient.fields.website.issues() ?? [] as issue (issue.message)}
									<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
								{/each}
							</Field.Field>
							<Field.Field class="relative">
								<Field.Label for="notes">Notes</Field.Label>
								<Textarea
									{...addClient.fields.notes.as('text')}
									id="notes"
									autocomplete="off"
									rows={8}
								/>
								{#each addClient.fields.notes.issues() ?? [] as issue (issue.message)}
									<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
								{/each}
							</Field.Field>
						</Field.Set>
					</Field.Group>
					<Dialog.Footer class="pt-8">
						<Button type="submit" disabled={!!addClient.pending}>
							{#if addClient.pending}
								<Spinner class="size-6" />
								Processing...
							{:else}
								Add Client
							{/if}
						</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</header>

<section class="mt-10">
	<h2 class="mb-4 text-2xl font-semibold">Clients</h2>
	{#each clients as client (client.id)}
		<div>{client.name}</div>
	{/each}
</section>
