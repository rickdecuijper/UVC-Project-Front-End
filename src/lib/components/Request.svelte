<script>
	let {
		request = {
			theDateId: 1,
			timeslotId: 2,
			name: 'Unknown',
			breed: 'Unknown',
			state: 'Unknown'
		}
	} = $props();
</script>

<tr class="odd:bg-white even:bg-slate-50 hover:bg-orange-50"
	><td class="p-3">{request.theDateId}</td><td>{request.timeslotId}</td><td>{request.name}</td><td
		>{request.breed}</td
	><td><button class="bg-amber-400 p-2 hover:cursor-pointer rounded hover:bg-amber-500">{request.state}</button></td></tr
>
