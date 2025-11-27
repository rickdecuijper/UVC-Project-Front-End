<!-- <script>
  export let headerClass = 'bg-red-400';
  export let dayName = 'ma';
  export let dayNumber = 24;
  export let timeSlot = 'morning';
</script>

<div class="col-span-1 text-gray-800 flex flex-col h-full">
  
  {#if timeSlot === 'morning'}
    <div class="{headerClass} text-white rounded-t-lg text-center font-bold p-2">
      {dayName} {dayNumber}
    </div>
  {/if}

  <div class="bg-gray-100 p-2 flex flex-col justify-end flex-grow"
       class:rounded-b-lg={timeSlot === 'afternoon'}
       class:mt-1={timeSlot === 'afternoon'}
  >
    <button class="text-xs text-gray-500 mt-auto">+ Taak</button>
  </div>

</div> -->