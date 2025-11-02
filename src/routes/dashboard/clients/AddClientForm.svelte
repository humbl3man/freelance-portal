<script lang="ts">
	import { addClient } from '$lib/api/clients.remote';
	import { clientSchema } from '$lib/schema/client';
	import * as Field from '$lib/components/ui/field';
	import * as Alert from '$lib/components/ui/alert';
	import { CircleAlertIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Spinner } from '$lib/components/ui/spinner';

	type AddClientFormProps = {
		afterSubmit: () => void;
	};
	let { afterSubmit }: AddClientFormProps = $props();
</script>

<form
	{...addClient.preflight(clientSchema).enhance(async ({ submit, form }) => {
		await submit();
		form.reset();
		afterSubmit();
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
		<Field.Field class="relative">
			<Field.Label class="flex justify-between" for="name"
				>Name <span class="text-xs text-black/50">*Required</span></Field.Label
			>
			<Input {...addClient.fields.name.as('text')} id="name" autocomplete="off" />
			{#each addClient.fields.name.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
		<Field.Field class="relative">
			<Field.Label class="flex justify-between" for="email"
				>Email <span class="text-xs text-black/50">*Required</span></Field.Label
			>
			<Input {...addClient.fields.email.as('email')} id="email" autocomplete="off" />
			{#each addClient.fields.email.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
		<div class="grid gap-7 md:grid-cols-2 md:gap-4">
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
		</div>
		<Field.Field class="relative">
			<Field.Label for="website">Website</Field.Label>
			<Input {...addClient.fields.website.as('url')} id="website" autocomplete="off" />
			{#each addClient.fields.website.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
		<Field.FieldSeparator />
		<Field.Field class="relative">
			<Field.Label for="notes">Notes</Field.Label>
			<Textarea {...addClient.fields.notes.as('text')} id="notes" autocomplete="off" rows={8} />
			{#each addClient.fields.notes.issues() ?? [] as issue (issue.message)}
				<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
			{/each}
		</Field.Field>
	</Field.Group>
	<div class="mt-4">
		<Button type="submit" disabled={!!addClient.pending}>
			{#if addClient.pending}
				<Spinner class="size-6" />
				Processing...
			{:else}
				Add
			{/if}
		</Button>
	</div>
</form>
