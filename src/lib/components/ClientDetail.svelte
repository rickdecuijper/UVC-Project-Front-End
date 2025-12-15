<script>
	import { getContext } from 'svelte';
	// OPTION 1 - via 
	// import { selectedClient } from '$lib/app.svelte.js';
	import { findEmoji } from '$lib/helpers/emoijs.js';

	// OPTION 1 - SHARED STATE
	// $inspect('ClientDetail.svelte', selectedClient);
	
	// OPTION 2 - USE CONTEXT (currently active)
	let selectedClient = getContext('selectedClient');
	// let { selectedClient } = $props();

	console.log('Woop',selectedClient);

</script>

{#if selectedClient.client === undefined}
	<p class="text-center">No client selected</p>
	<p class="text-center">Please select an appointment to see the details</p>
{:else}
	<h2 class="rounded-full absolute -top-10 left-1/2 inline-block p-2 bg-red-200 text-6xl">{findEmoji(selectedClient.client.breed)}</h2>
	<p class="text-center">{selectedClient.client.name}</p>
{/if}