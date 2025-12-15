<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section class="flex h-screen flex-col justify-between">
	<header class="flex flex-row justify-between bg-orange-50">
		<h1 class="p-4 text-lg">🐍 Veterinarian</h1>
		<nav class="p-4">
			<ul class="flex space-x-4">
				<li><a href="/" class:font-bold={page.url.pathname === '/'}> Home </a></li>
				<li>
					<a href="/clients" class:font-bold={page.url.pathname === '/clients'}> Clients </a>
				</li>
				<li><a href="/requests" class:font-bold={page.url.pathname === '/requests'}> Requests </a></li>
			</ul>
		</nav>
	</header>
	<main>
		{@render children?.()}
	</main>

	<footer class="">
		<p class="p-2 text-center">Made with ❤️</p>
	</footer>
</section>
