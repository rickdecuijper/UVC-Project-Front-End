<script lang="ts">
	import { enhance } from '$app/forms';

	// Client-side time slots for display
	function makeTimeSlots(start = '09:00', end = '17:00', stepMin = 30) {
		const [sh, sm] = start.split(':').map(Number);
		const [eh, em] = end.split(':').map(Number);

		const d = new Date();
		d.setHours(sh, sm, 0, 0);
		const endD = new Date();
		endD.setHours(eh, em, 0, 0);

		const out: string[] = [];
		const pad = (n: number) => n.toString().padStart(2, '0');

		while (d <= endD) {
			out.push(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
			d.setMinutes(d.getMinutes() + stepMin);
		}
		return out;
	}

	const slots = makeTimeSlots();
	const todayStr = new Date().toISOString().split('T')[0];

	// UI state for progressive enhancement feedback
	let selectedTime = '';
	let message = '';
	let errors: Record<string, string> = {};
	let values: Record<string, string> = {};

	const enhanceOpts = {
		result: ({ result }: any) => {
			if (result.type === 'failure') {
				errors = result.data?.errors ?? {};
				values = result.data?.values ?? {};
				message = result.data?.message ?? 'Please fix the errors below.';
			} else if (result.type === 'success') {
				errors = {};
				values = result.data?.values ?? {};
				message = result.data?.message ?? 'Saved.';
				selectedTime = '';
			}
		}
	};
</script>

<section class="mx-auto max-w-xl p-4 sm:p-6">
	<h1 class="mb-4 text-2xl font-semibold text-gray-900">Book a visit</h1>

	{#if message}
		<div
			class="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
		>
			{message}
		</div>
	{/if}

	<form
		method="POST"
		action="?/book"
		use:enhance={enhanceOpts}
		class="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
	>
		<!-- Pet name -->
		<div>
			<label for="pet_name" class="block text-sm font-medium text-gray-700">Pet name</label>
			<input
				id="pet_name"
				name="pet_name"
				type="text"
				placeholder="e.g., Luna"
				value={values.pet_name}
				required
				aria-invalid={errors.pet_name ? 'true' : 'false'}
				aria-describedby={errors.pet_name ? 'err-pet_name' : undefined}
				class="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			/>
			{#if errors.pet_name}
				<p id="err-pet_name" class="mt-1 text-sm text-red-600">{errors.pet_name}</p>
			{/if}
		</div>

		<!-- Date -->
		<div>
			<label for="date" class="block text-sm font-medium text-gray-700">Date</label>
			<input
				id="date"
				name="date"
				type="date"
				min={todayStr}
				value={values.date}
				required
				aria-invalid={errors.date ? 'true' : 'false'}
				aria-describedby={errors.date ? 'err-date' : undefined}
				class="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			/>
			{#if errors.date}
				<p id="err-date" class="mt-1 text-sm text-red-600">{errors.date}</p>
			{/if}
		</div>

		<!-- Time slot picker -->
		<fieldset>
			<legend class="mb-2 block text-sm font-medium text-gray-700">Time</legend>

			<div
				class="grid grid-cols-3 gap-2 sm:grid-cols-4"
				role="radiogroup"
				aria-label="Available time slots"
			>
				{#each slots as slot}
					<label class="relative">
						<input
							type="radio"
							name="time"
							value={slot}
							bind:group={selectedTime}
							aria-label={`Time ${slot}`}
							required
							class="peer sr-only"
						/>
						<span
							class="block rounded-xl border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 transition
                     select-none peer-checked:border-indigo-600
                     peer-checked:bg-indigo-600 peer-checked:text-white hover:border-indigo-400
                     focus:outline-none"
						>
							{slot}
						</span>
					</label>
				{/each}
			</div>

			{#if errors.time}
				<p id="err-time" class="mt-2 text-sm text-red-600">{errors.time}</p>
			{/if}
		</fieldset>

		<div class="pt-2">
			<button
				type="submit"
				class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white
               shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Book
			</button>
		</div>
	</form>
</section>
