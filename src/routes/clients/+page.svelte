<script>
	import Client from '$lib/components/Client.svelte';
</script>

<section class="container mx-auto mt-4 w-full">
	<section class="mt-4">
		<h2 class="p-2 text-2xl lg:p-0 lg:text-6xl">
			Cl<span class="inline-block rounded-lg bg-emerald-200 p-2">ients</span>
		</h2>
	</section>
	<section class="mt-5 flex flex-col bg-slate-50">
		<ul class="flex flex-wrap">
			{#each Array(8) as _, i}
				<Client />
			{/each}
		</ul>
	</section>
</section>
