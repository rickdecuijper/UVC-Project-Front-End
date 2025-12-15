<script>
  export let title;
  export let color;
</script>

<div class="bg-white p-4 rounded-xl shadow-lg border-l-4" 
     class:border-red-400={color === 'red'} 
     class:border-blue-400={color === 'blue'} 
>
  <div class="flex justify-between items-start">
    <div>
      <h3 class="font-bold text-lg">{title}</h3>
      <p class="text-sm text-gray-500">Korte omschrijving.</p>
    </div>
    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/24/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
  </div>
  <p class="mt-4 text-xs text-gray-400">Nog niet gestart</p>
</div>