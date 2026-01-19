<script>
	 import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { base } from '$app/paths';

  let { children } = $props();

  // Dynamische data
  let kinderenAantal = 3;
 const activePath = derived(page, ($page) => {
    const path = $page.url.pathname;
    return path.startsWith(base) ? path.slice(base.length) || '/' : path;
  });

  const navItems = [
    { name: 'Schattenjacht', href: `${base}/schatkaart` },
    { name: 'Kalender', href: `${base}/kalender` },
    { name: 'Avatars', href: `${base}/avatars` }
  ];

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section class="flex h-screen flex-col justify-between">

<header class="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white px-6 py-4">
  <div class="flex justify-between items-center">

    <!-- Left: Title + subtitle -->
    <div class="flex items-center space-x-4">
      <div class="bg-white/20 p-3 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <div>
        <h1 class="text-xl font-bold">Speeltuin Onderhoud</h1>
        <p class="text-sm text-white/90">Plan en beheer schoonmaak- en onderhoudstaken</p>
      </div>
    </div>

    <!-- Right: Navigation + actions -->
    <div class="flex items-center space-x-6">

      <!-- Navigation -->
      <nav>
        <ul class="flex space-x-3 text-sm font-medium">
          {#each navItems as item}
            <li>
              <a 
                href={item.href}
                class="px-4 py-2 rounded-full transition
                      { $activePath === item.href.replace(base, '') ? 'bg-white text-purple-600 font-semibold shadow' : 'bg-white/20 hover:bg-white/30'}">
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Action buttons -->
      <div class="flex space-x-2">
        <a href={base + '/'} class="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow text-sm font-medium">⎋ <span>Uitloggen</span></a>
      </div>

    </div>
  </div>
</header>

    <main>
        {@render children?.()}
    </main>
        <footer class="bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 
                    text-white p-6 text-center text-sm shadow-inner">
            
            <p class="font-bold text-lg">
                 Schoolplein Onderhoud
            </p>

            <p class="mt-1 font-medium">
                Ontwikkeld door <span class="underline">Sneaky Golem</span>
            </p>

            <p class="mt-2">
                Boaz Vaneveld · Rick de Cuijper · Bart Geijtenbeek ·<br>
                Valentijn van Grunsven · Xander UijtdeHaag
            </p>

            <p class="mt-3 text-white/90">
            In opdracht van IVN
            </p>
        </footer>

</section>
