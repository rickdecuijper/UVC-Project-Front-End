<script>
    import { createEventDispatcher } from 'svelte';
    
    export let missie; 
    export let isGeopend; 

    const dispatch = createEventDispatcher();
    
    function markeerVoltooid() {
        dispatch('voltooi', missie.id);
    }
    
    // Fix voor a11y: Maakt het element klikbaar via ENTER en SPACE
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.keyCode === 32) {
            event.preventDefault(); // Voorkom standaardgedrag (zoals scrollen)
            dispatch('click'); // Trigger de klik-actie die de popup opent
        }
    }
</script>

<div 
    class="missie-punt absolute cursor-pointer w-10 h-10 z-20"
    class:voltooid={missie.status === 'Voltooid'} 
    style="top: {missie.locatie.top}; left: {missie.locatie.left};"
    
    tabindex="0"
    role="button"
    on:click
    on:keydown={handleKeyDown}
>
    <div 
        class="pin-nummer absolute top-0 left-0 w-8 h-8 flex items-center justify-center 
               rounded-full text-white font-bold text-lg border-4 border-white transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
        class:bg-red-500={missie.status !== 'Voltooid'}
        class:bg-green-500={missie.status === 'Voltooid'}
    >
        {missie.id}
    </div>

    <span 
        class="status-badge absolute right-[-5px] top-[-10px] px-2 py-0.5 
               rounded text-xs font-semibold whitespace-nowrap shadow-md z-30"
        class:bg-green-600={missie.status === 'Voltooid'}
        class:bg-orange-500={missie.status !== 'Voltooid'}
        class:text-white={true}
    >
        {#if missie.status === 'Voltooid'}
            ✔️ Gedaan
        {:else}
            ⚠️ Nog niet gedaan
        {/if}
    </span>

    {#if isGeopend}
        <div class="missie-popup absolute bottom-full left-1/2 transform -translate-x-1/2 
                    bg-yellow-100 border-2 border-yellow-400 p-4 w-64 rounded-lg shadow-xl z-30 mb-2">
            
            <h4 class="font-bold text-gray-800 mb-1">{missie.naam}</h4>
            <p class="text-sm text-gray-600 border-b pb-2 mb-2">{missie.beschrijving}</p>
            
            {#if missie.status !== 'Voltooid'}
                <button 
                    class="voltooi-knop w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition" 
                    on:click|stopPropagation={markeerVoltooid}>
                    Markeer als voltooid
                </button>
            {:else}
                <p class="text-sm text-green-700 font-medium">Deze taak is al voltooid!</p>
            {/if}
        </div>
    {/if}
</div>