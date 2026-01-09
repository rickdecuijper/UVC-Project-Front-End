<script>
  import { createEventDispatcher } from 'svelte';
  export let monthName;

  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6 p-6 bg-gradient-to-r from-amber-500 via-green-500 to-blue-500 rounded-2xl shadow-lg text-white">
  
  <!-- Left: Week & Month Controls -->
  <div class="flex items-center gap-2">
    <button
      on:click={() => dispatch('prevWeek')}
      class="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors duration-200"
    >
      ← Vorige week
    </button>
  </div>

  <!-- Center: Month Banner -->
  <div class="text-2xl md:text-3xl font-extrabold text-center drop-shadow-md">
    {monthName}
  </div>

  <!-- Right: Week & Month Controls -->
  <div class="flex items-center gap-2">
    <button
      on:click={() => dispatch('nextWeek')}
      class="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors duration-200"
    >
      Volgende week →
    </button>
  </div>
</div>
