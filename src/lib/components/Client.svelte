<script>
	let {
		client = {
			name: 'John Doe'
		}
	} = $props();
</script>

<li class="p-2">
	<a class="underline" href="#">{client.name}</a>
</li>
