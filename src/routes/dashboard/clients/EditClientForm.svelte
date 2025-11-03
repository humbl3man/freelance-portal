<script lang="ts">
	import { getClients, updateClient } from '$lib/api/clients.remote';
	import { updateClientSchema } from '$lib/schema/client';
	import * as Field from '$lib/components/ui/field';
	import * as Alert from '$lib/components/ui/alert';
	import { CircleAlertIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Spinner } from '$lib/components/ui/spinner';
	import type { Client } from '$lib/types/client';
	import { toast } from 'svelte-sonner';

	type UpdateClientFormProps = {
		client: Client;
		onCancel: () => void;
	};
	let { client, onCancel }: UpdateClientFormProps = $props();
	let updateForm = updateClient.for(client.id);
</script>

<form
	{...updateForm.preflight(updateClientSchema).enhance(async ({ submit, form, data }) => {
		await submit().updates(getClients());
		toast.success('Client updated');
	})}
	oninput={() => updateForm.validate()}
>
	{#if updateForm.result?.error}
		<Alert.Root variant="destructive" class="my-2">
			<CircleAlertIcon />
			<Alert.Title>{updateForm.result.error}</Alert.Title>
		</Alert.Root>
	{/if}
	<input {...updateForm.fields.id.as('hidden', client.id)} />
	<Field.Group>
		<Field.Field class="relative">
			<Field.Label class="flex justify-between" for="update_name">Name</Field.Label>
			<Input
				{...updateForm.fields.name.as('text')}
				value={client.name}
				id="update_name"
				autocomplete="off"
			/>
			{#each updateForm.fields.name.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
		<Field.Field class="relative">
			<Field.Label class="flex justify-between" for="update_email">Email</Field.Label>
			<Input
				{...updateForm.fields.email.as('email')}
				value={client.email}
				id="update_email"
				autocomplete="off"
			/>
			{#each updateForm.fields.email.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
		<div class="grid gap-7 md:grid-cols-2 md:gap-4">
			<Field.Field class="relative">
				<Field.Label for="update_company">Company</Field.Label>
				<Input
					{...updateForm.fields.company.as('text')}
					value={client.company}
					id="update_company"
					autocomplete="off"
				/>
				{#each updateForm.fields.company.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="update_phone">Phone</Field.Label>
				<Input
					{...updateForm.fields.phone.as('text')}
					value={client.phone}
					id="update_phone"
					autocomplete="off"
				/>
				{#each updateForm.fields.phone.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
		</div>
		<Field.Field class="relative">
			<Field.Label for="update_website">Website</Field.Label>
			<Input
				{...updateForm.fields.website.as('url')}
				value={client.website}
				id="update_website"
				autocomplete="off"
			/>
			{#each updateForm.fields.website.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
		<Field.FieldSeparator />
		<Field.Field class="relative">
			<Field.Label for="update_notes">Notes</Field.Label>
			<Textarea
				{...updateForm.fields.notes.as('text')}
				value={client.notes}
				id="update_notes"
				autocomplete="off"
				rows={8}
			/>
			{#each updateForm.fields.notes.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
	</Field.Group>
	<div class="mt-4 flex gap-2">
		<Button type="submit" disabled={!!updateForm.pending}>
			{#if updateForm.pending}
				<Spinner class="size-6" />
				Processing...
			{:else}
				Update
			{/if}
		</Button>
		<Button onclick={onCancel} variant="secondary" disabled={!!updateForm.pending}>Cancel</Button>
	</div>
</form>
