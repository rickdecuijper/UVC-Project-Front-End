<script>
	import Request from '$lib/components/Request.svelte';
	// data is the reserved word for getting data from the server page (+page.js)
	let { data } = $props();
</script>

<section class="container mx-auto mt-4 w-full">
	<section class="mt-4">
		<h2 class="p-2 text-2xl lg:p-0 lg:text-6xl">
			App<span class="inline-block rounded-lg bg-emerald-200 p-2">ointments requests</span>
		</h2>
	</section>
	<section class="mt-4">
		<a href="/requests/create" class="text-lg underline hover:text-amber-300">New appointment</a>
	</section>
	<table class="mt-5 w-screen table-auto border-separate text-center text-xs">
		<thead><tr><th>Date</th><th>Timeslot</th><th>Name</th><th>Breed</th><th>State</th></tr></thead>
		<tbody>
			{#if data && data.appointments}
				{#each data.appointments as request}
					<Request {request} />
				{/each}
			{:else}
				<tr><td colspan="5">No requests available</td></tr>
			{/if}
		</tbody>
	</table>
</section>
