<script>
  import CalendarHeader from './CalendarHeader.svelte';
  import CalendarCell from './CalendarCell.svelte';

  const days = ['ma','di','wo','do','vr','za','zo'];
  const blocks = [
    { label: 'Ochtend', color: 'bg-yellow-400' },
    { label: 'Middag', color: 'bg-red-500' }
  ];
</script>

<section class="bg-white p-4 rounded-xl shadow-lg mb-12">
  <CalendarHeader />

  <div class="grid grid-cols-8 gap-1 mb-1">
    <div class="col-span-1 p-2 bg-gray-50"></div>
    {#each days as day, i}
      <div class="col-span-1 text-white rounded-t-lg text-center font-bold p-2
        {i === 0 ? 'bg-red-400' : ''}
        {i === 1 ? 'bg-orange-500' : ''}
        {i === 2 ? 'bg-green-500' : ''}
        {i === 3 ? 'bg-blue-600' : ''}
        {i === 4 ? 'bg-blue-500' : ''}
        {i === 5 ? 'bg-purple-500' : ''}
        {i === 6 ? 'bg-pink-500' : ''}">
        {day}
      </div>
    {/each}
  </div>

  {#each blocks as block}
    <div class="grid grid-cols-8 gap-1 mb-1">
      <div class="col-span-1 p-2 text-white rounded-l-lg flex items-center justify-center {block.color}">
        <span class="text-xs font-bold">{block.label}</span>
      </div>

      {#each Array(7) as _}
        <CalendarCell />
      {/each}
    </div>
  {/each}
</section>
