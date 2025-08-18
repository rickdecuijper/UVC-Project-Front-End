<script>
	import Clients from '$lib/components/Client.svelte';
</script>

<section class="container mx-auto mt-4 w-full">
	<section class="mt-4">
		<h2 class="text-6xl">
			Cl<span class="inline-block rounded-lg bg-emerald-200 p-2">ients</span>
		</h2>
	</section>
	<section class="mt-5 flex flex-col lg:flex-row">
		<div class="basis-4/6 rounded-lg bg-slate-50 p-10 lg:mr-8">
			<Clients />
		</div>
	</section>
</section>