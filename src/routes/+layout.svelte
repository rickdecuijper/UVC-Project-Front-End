<script>
    import '../app.css';
    import favicon from '$lib/assets/favicon.svg';

    // Dit is de correcte manier om de 'children' prop op te halen in Svelte 5.
    let { children } = $props(); 

    // De Svelte 'page' store laten we weg, omdat deze data ophaalt en crasht.
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<section class="flex h-screen flex-col justify-between">
    <header class="flex justify-between items-center bg-purple-100 p-4">
        <h1 class="text-lg">Speeltuin Onderhoud</h1>

        <div class="flex space-x-6 items-center"> 
            
            <nav>
                <ul class="flex space-x-4 text-sm font-medium">
                    <li><a href="/schatkaart"> Schatkaart </a></li>
                    <li><a href="/kalender"> Kalender </a></li>
                    <li><a href="#"> Avatar </a></li>
                </ul>
            </nav>
            
            <div class="flex space-x-2">
                <button class="p-2 bg-white rounded-lg shadow text-sm">Kinderen</button>
                <button class="p-2 bg-red-100 text-red-700 rounded-lg shadow text-sm">Uitloggen</button>
            </div>
        </div>
    </header>
    <main>
        {@render children?.()}
    </main>

    <footer class="">
        <p class="p-2 text-center">Footer</p>
    </footer>
</section>