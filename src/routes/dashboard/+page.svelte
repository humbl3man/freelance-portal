<script lang="ts">
	import { getClientStats, getProjectStats } from '$lib/api/clients.remote';

	const numberOfClients = $derived(await getClientStats());
	const numberOfProjects = await getProjectStats();
</script>

<h1 class="text-bold text-center text-3xl">Overview page</h1>
<div class="my-5 grid grid-cols-3 gap-4">
	<div class="rounded-md border p-8">
		<div class="text-base text-gray-700">Clients</div>
		<div class="text-3xl font-semibold">{numberOfClients}</div>
		<div class="mt-4">
			<a class="text-blue-500 hover:underline" href="/dashboard/clients">See All</a>
		</div>
	</div>
	<div class="rounded-md border p-8">
		<div class="text-base text-gray-700">Projects</div>
		<div class="text-3xl font-semibold">{numberOfProjects}</div>
		{#if numberOfProjects === 0}
			<div class="mt-4">
				<a class="text-blue-500 hover:underline" href="/dashboard/projects/create"
					>Create a project</a
				>
			</div>
		{:else}
			<div class="mt-4">
				<a class="text-blue-500 hover:underline" href="/dashboard/projects">See All</a>
			</div>
		{/if}
	</div>
</div>
