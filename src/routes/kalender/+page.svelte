<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Calendar state
  let currentDate = new Date();
  let showModal = false;
  let modalData = { date: null, time: null, taskIndex: null, editing: false };
  let newTask = { title: '', description: '', subtasks: [''], status: 'Nog niet gestart', people: [] };

  const peopleOptions = ['Emma', 'Liam', 'Sophie'];

  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  }

  let weekDays = [];
  function updateWeekDays() {
    const start = getStartOfWeek(currentDate);
    weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      weekDays.push({
        date: d,
        name: d.toLocaleDateString('nl-NL', { weekday: 'short' }),
        dayNumber: d.getDate()
      });
    }
  }

  function prevWeek() { currentDate.setDate(currentDate.getDate()-7); updateWeekDays(); }
  function nextWeek() { currentDate.setDate(currentDate.getDate()+7); updateWeekDays(); }

  onMount(() => updateWeekDays());

  let tasks = writable({});

  function openTaskModal(date, time, editingTask = null, taskIndex = null) {
    modalData = { date, time, taskIndex, editing: !!editingTask };
    if(editingTask){
      newTask = JSON.parse(JSON.stringify(editingTask));
      if(!newTask.subtasks || newTask.subtasks.length === 0) newTask.subtasks = [''];
    } else {
      newTask = { title: '', description: '', subtasks: [''], status: 'Nog niet gestart', people: [] };
    }
    showModal = true;
  }

  function addTaskSubtask() { newTask.subtasks = [...newTask.subtasks, '']; }
  function removeTaskSubtask(i) { newTask.subtasks = newTask.subtasks.filter((_,idx)=>idx!==i); }

  function saveTask() {
    tasks.update(t => {
      const key = modalData.date.toDateString();
      if(!t[key]) t[key] = { morning: [], afternoon: [] };
      if(modalData.editing){
        t[key][modalData.time][modalData.taskIndex] = JSON.parse(JSON.stringify(newTask));
      } else {
        t[key][modalData.time].push(JSON.parse(JSON.stringify(newTask)));
      }
      return t;
    });
    showModal = false;
  }

  // Drag & drop for calendar tasks
  let dragTask = null;
  let dragOrigin = null;
  function handleDragStart(e,task,date,time,index){ dragTask=task; dragOrigin={date,time,index}; e.dataTransfer.effectAllowed='move'; }
  function handleDrop(e,date,time){
    tasks.update(t=>{
      if(dragOrigin){
        const keyO = dragOrigin.date.toDateString();
        t[keyO][dragOrigin.time].splice(dragOrigin.index,1);
      }
      const key = date.toDateString();
      if(!t[key]) t[key] = { morning: [], afternoon: [] };
      t[key][time].push({...dragTask});
      return t;
    });
    dragTask=null;
    dragOrigin=null;
  }
  function allowDrop(e){ e.preventDefault(); }

  $: monthName = currentDate.toLocaleString('nl-NL',{ month:'long', year:'numeric' });

  // Task pool
  let taskPool = writable([]);
  let showPoolForm = false;
  let newPoolTask = { title: '', description: '', subtasks: [''], status: 'Nog niet gestart', people: [] };

  function addPoolSubtask() { newPoolTask.subtasks = [...newPoolTask.subtasks, '']; }
  function removePoolSubtask(i) { newPoolTask.subtasks = newPoolTask.subtasks.filter((_,idx)=>idx!==i); }

  function savePoolTask() {
    taskPool.update(t => [...t, {...newPoolTask}]);
    newPoolTask = { title:'', description:'', subtasks:[''], status:'Nog niet gestart', people:[] };
    showPoolForm = false;
  }

  // Drag from pool into calendar
  function handlePoolDragStart(task){ dragTask = task; }
</script>

<div class="max-w-7xl mx-auto p-4 bg-gray-50 rounded-2xl shadow-md">
  <!-- Calendar navigation -->
  <div class="flex justify-between items-center mb-6">
    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" on:click={prevWeek}>← Vorige week</button>
    <div class="text-xl font-bold text-gray-800">{monthName}</div>
    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" on:click={nextWeek}>Volgende week →</button>
  </div>

  <!-- Calendar grid -->
  <div class="grid grid-cols-[120px_repeat(7,1fr)] gap-4">
    <div class="flex flex-col gap-6 text-right text-gray-700 font-semibold mt-10">
      <div class="bg-yellow-400 text-white rounded-xl p-3 shadow-md">Ochtend<br>09:00-12:00</div>
      <div class="bg-teal-400 text-white rounded-xl p-3 shadow-md">Middag<br>12:00+</div>
    </div>

    {#each weekDays as day}
      <div class="flex flex-col bg-white rounded-2xl shadow">
        <div class={`text-center p-3 font-bold text-white rounded-t-2xl
          ${day.name==='ma'?'bg-pink-500':
            day.name==='di'?'bg-orange-500':
            day.name==='wo'?'bg-lime-500':
            day.name==='do'?'bg-green-500':
            day.name==='vr'?'bg-blue-500':
            day.name==='za'?'bg-indigo-500':'bg-purple-500'}`}>
          {day.name} {day.dayNumber}
        </div>

        {#each ['morning','afternoon'] as time}
          <div class="p-2 flex flex-col gap-2 bg-gray-50 rounded-b-xl"
               on:drop={(e)=>handleDrop(e,day.date,time)} on:dragover={allowDrop}>
            {#if $tasks[day.date.toDateString()]?.[time]}
              {#each $tasks[day.date.toDateString()][time] as task,index}
                <div class="bg-white p-3 rounded-xl shadow cursor-pointer hover:bg-gray-100"
                     draggable="true"
                     on:dragstart={(e)=>handleDragStart(e,task,day.date,time,index)}
                     on:click={()=>openTaskModal(day.date,time,task,index)}>
                  <div class="font-semibold">{task.title}</div>
                  <div class="text-xs font-medium text-gray-600">{task.status}</div>
                  <div class="text-sm text-gray-500 flex gap-1 flex-wrap mt-1">
                    {#each task.people ?? [] as p}
                      <span class="bg-blue-200 text-blue-800 px-2 rounded-full text-xs">{p}</span>
                    {/each}
                  </div>
                  {#if task.subtasks?.length}
                    <ul class="mt-1 text-xs list-disc list-inside text-gray-500">
                      {#each task.subtasks as st}<li>{st}</li>{/each}
                    </ul>
                  {/if}
                </div>
              {/each}
            {/if}
            <button class="text-blue-500 border border-blue-500 rounded-lg px-2 py-1 hover:bg-blue-100"
                    on:click={()=>openTaskModal(day.date,time)}>+ Taak</button>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<!-- Task Modal -->
{#if showModal}
<div class="absolute z-50 top-24 left-1/2 -translate-x-1/2 w-96 bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
  <h2 class="text-xl font-bold mb-2">{modalData.editing ? 'Bewerk taak' : 'Nieuwe taak toevoegen'}</h2>
  <input class="w-full mb-2 p-2 border rounded-lg" placeholder="Voer taaknaam in" bind:value={newTask.title} />
  <textarea class="w-full mb-2 p-2 border rounded-lg" placeholder="Beschrijving" bind:value={newTask.description}></textarea>

  <label class="block mb-2 font-semibold">Status:</label>
  <select class="w-full mb-2 p-2 border rounded-lg" bind:value={newTask.status}>
    <option>Nog niet gestart</option>
    <option>In progress</option>
    <option>Voltooid</option>
  </select>

  <label class="block mb-2 font-semibold">Personen:</label>
  <div class="flex gap-2 mb-2 flex-wrap">
    {#each peopleOptions as p}
      <label class="flex items-center gap-1">
        <input type="checkbox"
               checked={newTask.people.includes(p)}
               on:change={e=>{
                 if(e.target.checked) newTask.people=[...newTask.people,p];
                 else newTask.people = newTask.people.filter(x=>x!==p);
               }} />
        {p}
      </label>
    {/each}
  </div>

  <label class="block mb-2 font-semibold">Subtaken:</label>
  <div class="flex flex-col gap-2 mb-2">
    {#each newTask.subtasks as st,i}
      <div class="flex gap-2">
        <input class="flex-1 p-2 border rounded-lg" placeholder="Subtaak..." bind:value={newTask.subtasks[i]} />
        <button class="bg-red-500 text-white px-2 rounded-lg" on:click={()=>removeTaskSubtask(i)}>x</button>
      </div>
    {/each}
    <button class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600" on:click={addTaskSubtask}>+ Subtaak</button>
  </div>

  <div class="flex justify-end gap-2 mt-4">
    <button class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" on:click={()=>showModal=false}>Annuleren</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" on:click={saveTask}>Opslaan</button>
  </div>
</div>
{/if}

<!-- Task Pool -->
<div class="max-w-7xl mx-auto mt-6 border-2 border-gray-300 rounded-2xl bg-gray-50 p-4 shadow-md">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-bold">Taken buiten de kalender</h2>
    <button class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600" on:click={()=>showPoolForm=!showPoolForm}>
      {showPoolForm ? 'Verberg form' : '+ Nieuwe taak'}
    </button>
  </div>

  {#if showPoolForm}
    <div class="flex flex-col gap-2 mb-4">
      <input type="text" class="w-full p-2 border rounded-lg" placeholder="Taaknaam" bind:value={newPoolTask.title} />
      <textarea class="w-full p-2 border rounded-lg" placeholder="Beschrijving" bind:value={newPoolTask.description}></textarea>

      <label class="font-semibold">Status:</label>
      <select class="w-full p-2 border rounded-lg" bind:value={newPoolTask.status}>
        <option>Nog niet gestart</option>
        <option>In progress</option>
        <option>Voltooid</option>
      </select>

      <label class="font-semibold">Personen:</label>
      <div class="flex gap-2 flex-wrap">
        {#each peopleOptions as p}
          <label class="flex items-center gap-1">
            <input type="checkbox" checked={newPoolTask.people.includes(p)} on:change={e=>{
              if(e.target.checked) newPoolTask.people = [...newPoolTask.people,p];
              else newPoolTask.people = newPoolTask.people.filter(x=>x!==p);
            }} />
            {p}
          </label>
        {/each}
      </div>

      <label class="font-semibold">Subtaken:</label>
      <div class="flex flex-col gap-2 mb-2">
        {#each newPoolTask.subtasks as st,i}
          <div class="flex gap-2">
            <input class="flex-1 p-2 border rounded-lg" bind:value={newPoolTask.subtasks[i]} placeholder="Subtaak..." />
            <button class="bg-red-500 text-white px-2 rounded-lg" on:click={()=>removePoolSubtask(i)}>x</button>
          </div>
        {/each}
        <button class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600" on:click={addPoolSubtask}>+ Subtaak</button>
      </div>

      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-2 self-start" on:click={savePoolTask}>Opslaan taak</button>
    </div>
  {/if}

  <div class="flex flex-col gap-2">
    {#each $taskPool as task}
      <div class="bg-white p-3 rounded-xl shadow cursor-grab"
           draggable="true"
           on:dragstart={()=>handlePoolDragStart(task)}>
        <div class="font-semibold">{task.title}</div>
        <div class="text-xs font-medium text-gray-600">{task.status}</div>
        <div class="flex gap-1 mt-1 flex-wrap">
          {#each task.people as p}
            <span class="bg-blue-200 text-blue-800 px-2 rounded-full text-xs">{p}</span>
          {/each}
        </div>
        {#if task.subtasks?.length}
          <ul class="mt-1 text-xs list-disc list-inside text-gray-500">
            {#each task.subtasks as st}<li>{st}</li>{/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
</div>
