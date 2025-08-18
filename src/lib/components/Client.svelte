<script>
	let {
		appointment = {
			timeslot: 900,
			client: 'John Doe'
		}
	} = $props();
</script>

<li>
	<p>{appointment.timeslot} - {appointment.client}</p>
</li>
