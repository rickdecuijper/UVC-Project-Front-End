<script>
    export let missiesVoltooid = 0; 
    export let totaalMissies = 5; 
    
    $: voortgangsPercentage = (missiesVoltooid / totaalMissies) * 100;
</script>

<header class="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
    
    <div class="flex items-center space-x-4">
        <span class="text-3xl text-orange-500">🏴‍☠️</span>
        <div class="text-left">
            <span class="text-lg font-bold text-gray-800">Schatzoektocht</span>
            <p class="text-sm text-gray-500 hidden sm:block">
                Volg het pad en voltooi alle taken om de schat te vinden!
            </p>
        </div>
    </div>

    <div class="text-center min-w-[250px] mx-4">
        <div class="text-xs font-semibold mb-1 text-gray-700">
            {missiesVoltooid}/{totaalMissies} taken
        </div>
        <div class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
                class="h-full bg-orange-500 transition-all duration-500 ease-in-out" 
                style="width: {voortgangsPercentage}%;">
            </div>
        </div>
    </div>
</header>