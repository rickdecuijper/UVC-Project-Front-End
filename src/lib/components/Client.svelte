<script>
	let { client = { name: 'John Doe', id: 1 } } = $props();
</script>

<li class="p-2">
	<a class="underline" href={`/client/${client.id}`}>
		{client.name}
	</a>
</li>
