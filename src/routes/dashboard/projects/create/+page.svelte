<script lang="ts">
	import { createProject } from '$lib/api/projects.remote';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Spinner } from '$lib/components/ui/spinner';
	import { Textarea } from '$lib/components/ui/textarea';
	import { projectSchema } from '$lib/schema/project';
</script>

<div class="container max-w-lg">
	<div class="mb-8">
		<h1 class="mb-2 text-2xl font-semibold">Create New Project</h1>
		<p class="text-black/80">Create a new project to track your work.</p>
	</div>

	<form
		{...createProject.preflight(projectSchema).enhance(async ({ submit, form }) => {
			await submit();
			form.reset();
		})}
		oninput={() => createProject.validate()}
	>
		<Field.Group>
			<Field.Field class="relative">
				<Field.Label for="title">Title</Field.Label>
				<Input {...createProject.fields.title.as('text')} id="title" />
			</Field.Field>
			<Field.Field class="relative">
				<Field.Label for="description">Description</Field.Label>
				<Textarea {...createProject.fields.description.as('text')} id="description" />
			</Field.Field>

			<Field.Field class="relative">
				<Field.Label for="status">Status</Field.Label>
				<Input {...createProject.fields.status.as('text')} id="status" />
			</Field.Field>
		</Field.Group>
		<Separator class="my-8" />
		<Button type="submit" disabled={!!createProject.pending}>
			{#if createProject.pending}
				<Spinner size="sm" />
			{:else}
				Create Project
			{/if}
		</Button>
	</form>
</div>
