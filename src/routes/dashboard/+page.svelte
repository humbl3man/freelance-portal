<script lang="ts">
	import { getClientStats, getProjectStats } from '$lib/api/clients.remote';

	const clientStats = $derived(await getClientStats());
	const projectStats = await getProjectStats();
	const numOfcolumns = 2;
</script>

<h1 class="text-bold text-center text-3xl">Overview page</h1>
<div class={`my-5 grid gap-4 grid-cols-${numOfcolumns}`}>
	<div class="flex items-center justify-center rounded-md border p-8">
		You have {clientStats}
		{clientStats === 1 ? 'client' : 'clients'}
	</div>
	<div class="flex items-center justify-center rounded-md border p-8">
		You have {projectStats}
		{projectStats === 1 ? 'project' : 'projects'}
	</div>
</div>
