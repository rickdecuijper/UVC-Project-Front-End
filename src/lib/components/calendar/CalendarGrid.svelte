<script>
  export let tasks = [
    { id: 1, title: 'Zandbak harken', date: '2025-12-15', time: 'Ochtend', type: 'E', child: 'L' },
    { id: 2, title: 'Speeltoestellen schoonmaken', date: '2025-12-15', time: 'Ochtend', type: 'E' },
    { id: 3, title: 'Prullenbakken legen', date: '2025-12-15', time: 'Middag', type: 'S' }
  ];

  const days = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
  const times = ['Ochtend', 'Middag'];
</script>

<div class="grid grid-cols-8 gap-2 bg-white p-4 rounded-xl shadow">
  <div class="col-span-1"></div>
  {#each days as day, i}
    <div class="text-center font-bold text-purple-700 p-2 rounded">{day}</div>
  {/each}

  {#each times as time}
    <div class="font-semibold text-white p-2 rounded 
                {time === 'Ochtend' ? 'bg-yellow-400' : 'bg-orange-400'}">
      {time}
    </div>

    {#each days as day, i}
      <div class="border-dashed border-2 border-orange-300 min-h-[80px] p-2 rounded">
        {#each tasks.filter(t => t.date.endsWith(`-${15+i}`) && t.time === time) as t}
          <div class="bg-blue-200 rounded p-1 mb-1 text-xs">
            {t.title} <span class="font-bold">{t.type}</span>
          </div>
        {/each}
        <button class="text-orange-500 text-sm mt-1">+ Taak</button>
      </div>
    {/each}
  {/each}
</div>
