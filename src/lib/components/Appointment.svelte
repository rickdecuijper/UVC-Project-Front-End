<script>
	let {
		appointment = {
			starttime: 900,
			name: 'John',
			breed: '🐈'
		}
	} = $props();
</script>

<ul class="flex flex-wrap justify-between rounded-lg bg-amber-100">
	<li class="mr-2 rounded-l-lg p-2">{appointment.starttime}</li>
	<li class="mr-2 p-2">{appointment.name}</li>
	<li class="mr-2 p-2">{appointment.breed}</li>
</ul>
