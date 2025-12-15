<script>
	import Appointment from '$lib/components/Appointment.svelte';
	import ClientDetail from '$lib/components/ClientDetail.svelte';

	import { setContext } from 'svelte';
	//let selectedClient = $state({ client: undefined });

	// data is the reserved word for getting data from the server page (+page.js)
	let { data } = $props();

	// Context used for shared state and updating state
	const selectedClient = $state({ client: undefined});
	setContext('selectedClient', selectedClient);
	//setContext('setClient', setClient);
</script>

<section class="container mx-auto w-full">
	<header class="mt-10">
		<h2 class="p-2 text-2xl lg:p-0 lg:text-6xl">
			To<span class="inline-block rounded-lg bg-pink-500 p-2">day</span>
		</h2>
	</header>

	<main class="mt-5 flex flex-col lg:flex-row">
		<div class="basis-4/6 rounded-lg bg-slate-50 p-10 lg:mr-8">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each data.scheduleToDay as appointment}
					<Appointment {appointment} />
				{/each}
			</div>
		</div>
		<aside id="details" class="relative mt-20 basis-2/6 rounded-lg bg-slate-50 p-10 lg:mt-0">
			<ClientDetail />
			<!-- <ClientDetail selectedClient={selectedClient} /> -->
		</aside>
	</main>
</section>
