<script>
	//import { setClient } from '$lib/app.svelte.js';
	import { getContext } from 'svelte';

	// using destructuring
	// downfall - not every property is guaranteed to be present or even visible
	let { appointment } = $props();
	// OPTION 2 - USE CONTEXT (currently active)
	const setClient = getContext('setClient');
	
	const displayAppointmentDetails = (appointment) => {
		console.log('Displaying appointment details for:', appointment);
		
		// OPTION 1 - SHARED STATE: updates the shared state with ClientDetail
		// setClient(appointment);
		// OPTION 2 - USE CONTEXT (currently active)
		setClient(appointment);
	};

</script>

<div class="appointment" id={appointment.id}>
	{#if appointment.appointment }
		<ul class="flex flex-wrap justify-between rounded-lg bg-amber-100 p-2">
			<li class="rounded-l-lg p-1">{appointment.starttime}</li>
			<li class="p-1">{appointment.appointment.name}</li>
			<li class="">
				<button
					class="cursor-pointer p-1 hover:rotate-45 hover:text-red-400"
					onclick={() => displayAppointmentDetails(appointment.appointment)}>⎋</button
				>
			</li>
		</ul>
	{:else}
		<ul class="flex flex-wrap justify-between rounded-lg bg-slate-100">
			<li class="mr-2 rounded-l-lg bg-slate-100 p-2">{appointment.starttime}</li>
			<li class="mr-2 bg-slate-100 p-2">---</li>
		</ul>
	{/if}
</div>
