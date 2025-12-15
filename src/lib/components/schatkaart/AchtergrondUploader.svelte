<script>
    import { createEventDispatcher } from 'svelte';
    
    // Maakt een functie om data terug te sturen naar de ouder component
    const dispatch = createEventDispatcher();
    
    // Standaard URL (gebruikt als er niets is opgeslagen)
    const DEFAULT_URL = '/img/jouw-speeltuin-kaart.jpg'; 
    
    // Haal de opgeslagen URL op bij de start van de component
    const storedBgUrl = typeof window !== 'undefined' ? localStorage.getItem('schatkaart-bg-url') : null;
    
    // De huidige URL (of de opgeslagen URL, of de default)
    let currentBgUrl = storedBgUrl || DEFAULT_URL;

    // Direct bij het laden sturen we de (opgeslagen of default) URL door naar de ouder
    dispatch('upload', currentBgUrl);
    
    // Functie om de geüploade afbeelding te verwerken
    function handleImageUpload(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const url = e.target.result;
                
                currentBgUrl = url;
                localStorage.setItem('schatkaart-bg-url', url); 
                
                // Stuur de nieuwe URL door naar +page.svelte
                dispatch('upload', url);
            };
            
            reader.readAsDataURL(file);
        }
    }
</script>

<div class="flex justify-end w-full max-w-[1200px] mx-auto pt-4 pr-4">
    <input 
        type="file" 
        id="bgUpload" 
        accept="image/*" 
        class="hidden" 
        on:change={handleImageUpload}
    />
    
    <label for="bgUpload" class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600 transition shadow-md text-sm">
        🗺️ Achtergrond Uploaden
    </label>
</div>