<script lang="ts">
	import { getUser } from '$lib/api/auth.remote';
	const { children } = $props();
	const user = await getUser();
</script>

<h1>Dashboard layout</h1>
<p>Hello, {user.name}</p>

{@render children?.()}
