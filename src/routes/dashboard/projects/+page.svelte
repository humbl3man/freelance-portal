<script lang="ts">
	import { getProjects } from '$lib/api/projects.remote';
	import { buttonVariants } from '$lib/components/ui/button';

	const projects = $derived(await getProjects());
	console.log(projects);
</script>

<div class="container mx-auto">
	<h1 class="text-2xl font-bold">Projects</h1>
	<p class="text-sm text-gray-500">These are the projects you are working on.</p>

	<div class="mt-4">
		<a class={buttonVariants({ variant: 'default' })} href="/dashboard/projects/create"
			>Add Project</a
		>
	</div>

	<div class="mt-4">
		{#each projects as project (project.id)}
			<div>
				<h2>{project.title}</h2>
				<p>{project.description}</p>
				<p>{project.status}</p>
			</div>
		{:else}
			<p>No projects found</p>
		{/each}
	</div>
</div>
