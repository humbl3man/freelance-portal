<script lang="ts">
	import { getClientStats } from '$lib/api/clients.remote';

	const clientStats = $derived(await getClientStats());
	$inspect('number of clients', clientStats);
</script>

<h1 class="text-bold text-center text-3xl">Overview page</h1>
<p class="my-4 text-center text-sm text-gray-500">
	You have {clientStats}
	{clientStats === 1 ? 'client' : 'clients'}
</p>
