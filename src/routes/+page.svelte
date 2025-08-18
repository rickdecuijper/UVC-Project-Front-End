<script>
	import Appointment from '$lib/components/Appointment.svelte';
	import ClientDetail from '$lib/components/ClientDetail.svelte';
</script>

<section class="container mx-auto w-full">
	<section class="mt-10">
		<h2 class="text-6xl">
			Ap<span class="inline-block rounded-lg bg-pink-500 p-2">pointments</span>
		</h2>
	</section>
	<section class="mt-5 flex flex-col lg:flex-row">
		<div class="basis-4/6 rounded-lg bg-slate-50 p-10 lg:mr-8">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Appointment />
			</div>
		</div>
		<sidebar id="details" class="basis-2/6 rounded-lg bg-slate-50 p-10 sm:mt-4 lg:mt-0">
            <ClientDetail />
        </sidebar>
	</section>
</section>
