<script>
  import { writable } from 'svelte/store';
  import CalenderHeader from '$lib/components/calendar/CalenderHeader.svelte';
  import TaskPool from '$lib/components/calendar/TaskPool.svelte';
  import { onMount } from 'svelte';

  export let data;

  /* =========================
     Stores & State
  ========================= */
  const tasks = writable(data.tasks || []);
  const peopleOptions = ['Emma','Liam','Sophie'];

  const emptyTask = {
    id: null,
    title: '',
    description: '',
    subtasks: [''],
    status: 'Nog niet gestart',
    people: [],
    date: null,
    time: null
  };

  const timeSlots = [];
  for(let h=8; h<18; h++){
    timeSlots.push(`${h.toString().padStart(2,'0')}:00`);
    timeSlots.push(`${h.toString().padStart(2,'0')}:30`);
  }
  timeSlots.push('18:00');

  const colors = {
    ma: 'bg-gradient-to-br from-pink-500 to-orange-500',
    di: 'bg-gradient-to-br from-orange-500 to-lime-400',
    wo: 'bg-gradient-to-br from-lime-400 to-green-500',
    do: 'bg-gradient-to-br from-green-500 to-blue-400',
    vr: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    za: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    zo: 'bg-gradient-to-br from-purple-500 to-pink-500',
  };
let currentDate = new Date();
  let weekDays = [];
  let monthName;

  function getStartOfWeek(date){
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // Monday as first day
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  }

  function updateWeekDays(){
    const start = getStartOfWeek(currentDate);
    weekDays = [];
    for (let i = 0; i < 7; i++){
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      weekDays.push({
        date: d,
        name: d.toLocaleDateString('nl-NL', { weekday: 'short' }),
        dayNumber: d.getDate()
      });
    }
  }

  function prevWeek(){
    currentDate = new Date(currentDate.setDate(currentDate.getDate() - 7)); // <-- reassign
    updateWeekDays();
  }

  function nextWeek(){
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 7)); // <-- reassign
    updateWeekDays();
  }

  $: {
    const start = getStartOfWeek(currentDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const startMonth = start.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
    const endMonth = end.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
    
    monthName = startMonth === endMonth ? startMonth : `${startMonth} – ${endMonth}`;
  }

  onMount(updateWeekDays)
  /* =========================
     Task Modal
  ========================= */
  let showModal = false;
  let modalData = { taskId: null, editing: false };
  let newTask = structuredClone(emptyTask);

  function openTaskModal(task = null, taskId = null, date = null, time = null){
    if(task){
      modalData = { taskId, editing: true };
      newTask = structuredClone(task);
    } else {
      modalData = { taskId: null, editing: false };
      newTask = structuredClone(emptyTask);
      newTask.date = date;
      newTask.time = time;
    }
    showModal = true;
  }

  function addTaskSubtask(){
    if(newTask.subtasks.length < 3) newTask.subtasks = [...newTask.subtasks,''];
  }

  function removeTaskSubtask(i){
    newTask.subtasks = newTask.subtasks.filter((_, idx)=> idx !== i);
  }

  function saveTask(){
    tasks.update(allTasks => {
      const taskCopy = structuredClone(newTask);
      if(!taskCopy.id) taskCopy.id = crypto.randomUUID();

      if(modalData.editing){
        const index = allTasks.findIndex(t => t.id === modalData.taskId);
        if(index !== -1) allTasks[index] = taskCopy;
      } else {
        allTasks.push(taskCopy);
      }

      return allTasks;
    });
    showModal = false;
  }

  function deleteTask(){
    tasks.update(allTasks => {
      const index = allTasks.findIndex(t => t.id === modalData.taskId);
      if(index !== -1) allTasks.splice(index,1);
      return allTasks;
    });
    showModal = false;
  }

  /* =========================
     Drag & Drop
  ========================= */
  function handleDragStart(task, source){
    window.__dragTask = structuredClone(task);
    window.__dragSource = source;
  }

  function handleDrop(date, time){
    const task = window.__dragTask;
    const source = window.__dragSource;
    if(!task) return;

    tasks.update(allTasks => {
      // Copy the task for calendar
      const taskCopy = {
        ...task,
        subtasks: [...task.subtasks],
        people: [...task.people],
        date,
        time,
        id: source === 'pool' ? crypto.randomUUID() : task.id
      };

      // Remove original if moving inside calendar or from calendar
      if(source === 'calendar'){
        const index = allTasks.findIndex(t => t.id === task.id);
        if(index !== -1) allTasks.splice(index,1);
      }

      allTasks.push(taskCopy);
      return allTasks;
    });

    window.__dragTask = null;
    window.__dragSource = null;
  }

  function unscheduleTask(task){
    tasks.update(allTasks => {
      const index = allTasks.findIndex(t => t.id === task.id);
      if(index !== -1) allTasks[index] = { ...allTasks[index], date: null, time: null };
      return allTasks;
    });
  }

  function allowDrop(e){ e.preventDefault(); }
  function formatDate(d){ 
    if(!d) return ''; 
    const dateObj = d instanceof Date ? d : new Date(d);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')}`;
  }

</script>

<style>
  .calendar-header { text-align:center; font-weight:bold; border-radius:12px; color:white; padding:8px; box-shadow:0 1px 3px rgba(0,0,0,0.2);}
  .calendar-cell { min-height:60px; border:1px solid #ddd; border-radius:12px; padding:4px; display:flex; flex-direction:column; }
  .time-slot { background:#f0f0f0; text-align:right; padding-right:4px; font-size:12px; font-weight:600; border-radius:6px; }
  .task-card { background:#dbeafe; padding:4px; border-radius:12px; margin-bottom:2px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.1); transition:all 0.2s; }
  .task-card:hover{ background:#bfdbfe; }
  .add-task-button{ border:1px dashed #c4b5fd; color:#7c3aed; font-size:12px; border-radius:12px; padding:2px 4px; cursor:pointer; margin-top:auto; text-align:center;}
</style>

<!-- =========================
     Calendar Header
========================= -->
<CalenderHeader
  {monthName}
  on:prevWeek={prevWeek}
  on:nextWeek={nextWeek}
/>

<!-- =========================
     Calendar Grid
========================= -->
<div class="grid grid-cols-[80px_repeat(7,1fr)] gap-2">
  <div></div>
  {#each weekDays as day}
    <div class={`calendar-header ${colors[day.name] ?? 'bg-gray-400'}`}>
      <div class="text-xs">{day.name}</div>
      <div class="text-lg">{day.dayNumber}</div>
    </div>
  {/each}

  {#each timeSlots as time}
    <div class="time-slot">{time}</div>

    {#each weekDays as day}
      <div class="calendar-cell"
           on:dragover={allowDrop}
           on:drop={() => handleDrop(day.date, time)}>

        {#each $tasks.filter(t => formatDate(t.date) === formatDate(day.date) && t.time === time) as task}
          <div class="task-card"
               draggable="true"
               on:dragstart={() => handleDragStart(task, 'calendar')}
               on:dblclick={() => openTaskModal(task, task.id)}>
            <div class="font-semibold truncate">{task.title}</div>
            <div class="text-gray-600 text-xs">{task.status}</div>
          </div>
        {/each}

        <div class="add-task-button" on:click={() => openTaskModal(null, null, day.date, time)}>+ Taak</div>
      </div>
    {/each}
  {/each}
</div>

<!-- =========================
     Task Modal
========================= -->
{#if showModal}
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl w-96 p-6 flex flex-col gap-4">
      <h2 class="text-2xl font-bold border-b pb-2">{modalData.editing ? 'Bewerk Taak' : 'Nieuwe Taak'}</h2>

      <input bind:value={newTask.title} placeholder="Taaknaam" class="w-full p-2 border rounded-lg"/>
      <textarea bind:value={newTask.description} placeholder="Beschrijving" class="w-full p-2 border rounded-lg" rows="3"></textarea>

      <label>Status:</label>
      <select bind:value={newTask.status} class="w-full p-2 border rounded-lg">
        <option>Nog niet gestart</option>
        <option>In progress</option>
        <option>Voltooid</option>
      </select>

      <label>Personen:</label>
      <div class="flex flex-wrap gap-2">
        {#each peopleOptions as p}
          <label class="flex items-center gap-1 cursor-pointer select-none">
            <input type="checkbox"
              checked={Array.isArray(newTask.people) && newTask.people.includes(p)}
              on:change={e => {
                if(!Array.isArray(newTask.people)) newTask.people=[];
                if(e.target.checked) newTask.people=[...newTask.people,p];
                else newTask.people=newTask.people.filter(x=>x!==p);
              }}
            />
            {p}
          </label>
        {/each}
      </div>

      <!-- Subtasks -->
      <div class="flex flex-col gap-2">
        {#each newTask.subtasks as st, i}
          <div class="flex gap-2 items-center">
            <input bind:value={newTask.subtasks[i]} placeholder="Subtaak..." class="flex-1 p-2 border rounded-lg"/>
            <button on:click={() => removeTaskSubtask(i)} class="bg-red-500 text-white px-3 py-1 rounded-lg">x</button>
          </div>
        {/each}
        {#if newTask.subtasks.length < 3}
          <button on:click={addTaskSubtask} class="bg-blue-500 text-white px-3 py-1 rounded-lg">+ Subtaak</button>
        {/if}
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button on:click={()=>showModal=false} class="bg-gray-400 text-white px-4 py-2 rounded-lg">Annuleren</button>
        {#if modalData.editing}
          <button on:click={deleteTask} class="bg-red-600 text-white px-4 py-2 rounded-lg">Verwijderen</button>
        {/if}
        <button on:click={saveTask} class="bg-blue-500 text-white px-4 py-2 rounded-lg">Opslaan</button>
      </div>
    </div>
  </div>
{/if}

<!-- =========================
     Task Pool
========================= -->
<TaskPool {tasks} {peopleOptions} on:unscheduleTask={(e)=>unscheduleTask(e.detail)} />
