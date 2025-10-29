<script lang="ts">
	import { getClient, updateClient } from '$lib/api/clients.remote';
	import { Input } from '$lib/components/ui/input/';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Field from '$lib/components/ui/field';

	const { params } = $props();
	const clientData = $derived(await getClient(params.clientId));
</script>

<h1 class="mb-4 text-2xl font-bold">Client Details</h1>

<!-- <div>{page.data.name}</div> -->
<!-- <p class="mb-4 text-lg font-semibold">{data.client}</p> -->

<form>
	<input type="hidden" name="id" value={params.clientId} />
	<Field.Group>
		<Field.Set>
			<Field.Field class="relative">
				<Field.Label for="name">Name</Field.Label>
				<Input
					{...updateClient.fields.name.as('text')}
					id="name"
					autocomplete="off"
					bind:value={clientData.name}
				/>
				{#each updateClient.fields.name.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="email">Email</Field.Label>
				<Input {...updateClient.fields.email.as('email')} id="email" autocomplete="off" />
				{#each updateClient.fields.email.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="company">Company</Field.Label>
				<Input {...updateClient.fields.company.as('text')} id="company" autocomplete="off" />
				{#each updateClient.fields.company.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="phone">Phone</Field.Label>
				<Input {...updateClient.fields.phone.as('text')} id="phone" autocomplete="off" />
				{#each updateClient.fields.phone.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="website">Website</Field.Label>
				<Input {...updateClient.fields.website.as('url')} id="website" autocomplete="off" />
				{#each updateClient.fields.website.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="notes">Notes</Field.Label>
				<Textarea
					{...updateClient.fields.notes.as('text')}
					id="notes"
					autocomplete="off"
					rows={8}
				/>
				{#each updateClient.fields.notes.issues() ?? [] as issue (issue.message)}
					<Field.Error class="absolute -bottom-[21px] left-0">{issue.message}</Field.Error>
				{/each}
			</Field.Field>
		</Field.Set>
	</Field.Group>
</form>
