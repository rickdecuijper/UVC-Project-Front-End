<script>
	import Appointment from '$lib/components/Appointment.svelte';
	import ClientDetail from '$lib/components/ClientDetail.svelte';
</script>

<section class="container mx-auto w-full">
	<section class="mt-10">
		<h2 class="text-6xl">
			To<span class="inline-block rounded-lg bg-pink-500 p-2">day</span>
		</h2>
	</section>

	<section class="mt-5 flex flex-col lg:flex-row">
		<div class="basis-4/6 rounded-lg bg-slate-50 p-10 lg:mr-8">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Appointment />
				<Appointment appointment={{ starttime: 915, name: 'Willy', breed: '🐕' }} />
				<Appointment appointment={{ starttime: 930, name: 'Jane', breed: '🐈' }} />
			</div>
		</div>
		<sidebar id="details" class="basis-2/6 rounded-lg bg-slate-50 p-10 sm:mt-4 lg:mt-0">
			<ClientDetail />
		</sidebar>
	</section>
</section>
