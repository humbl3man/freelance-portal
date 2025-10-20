<script>
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<div class="flex h-dvh items-center justify-center">
	<div>
		<h1 class="mb-4 text-4xl font-bold">Freelance Management Portal</h1>
		<div class="grid grid-cols-2 gap-2">
			<a
				href="/auth/login"
				class={`cursor-pointer ${buttonVariants({
					variant: 'default'
				})}`}>Login</a
			>
			<a
				href="/auth/signup"
				class={`cursor-pointer ${buttonVariants({
					variant: 'outline'
				})}`}>Sign Up</a
			>
		</div>
	</div>
</div>
