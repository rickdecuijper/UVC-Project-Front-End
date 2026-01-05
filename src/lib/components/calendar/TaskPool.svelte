<script>
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  export let taskPool; // renamed from 'pool' for clarity
  const dispatch = createEventDispatcher();

  let activeEditIndex = null;

  // Add a new task
  function addTask() {
    taskPool.update(tasks => [
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        subtasks: [''],
        status: 'Nog niet gestart',
        people: []
      }
    ]);
    activeEditIndex = $taskPool.length; // open the newly added task
  }

  // Update a task safely
  function updateTask(index, updater) {
    taskPool.update(tasks => {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updater(structuredClone(updatedTasks[index]));
      return updatedTasks;
    });
  }

  // Handle drag start
  function startDrag(task) {
    dispatch('dragstart', structuredClone(task));
  }
</script>

<div class="task-pool p-4 border rounded-lg bg-blue-50 shadow-sm">
  <div class="flex justify-between items-center mb-3">
    <h2 class="font-bold text-xl text-blue-700">Taak Pool</h2>
    <button class="btn-primary" on:click={addTask}>+ Nieuwe Taak</button>
  </div>

  <div class="flex gap-3 overflow-x-auto py-2">
    {#each $taskPool as task, i (task.id)}
      <div class="task-card min-w-[160px] p-3 bg-white border rounded-lg shadow hover:shadow-lg transition cursor-grab" draggable="true" on:dragstart={() => startDrag(task)}>
        <div class="font-semibold truncate text-blue-800">{task.title || 'Nieuwe Taak'}</div>
        <div class="text-sm text-gray-500 truncate">{task.status}</div>
        <button class="text-xs text-blue-500 mt-2 hover:underline" on:click={() => activeEditIndex = activeEditIndex === i ? null : i}>
          {activeEditIndex === i ? 'Sluiten' : 'Bewerk'}
        </button>

        {#if activeEditIndex === i}
          <div class="mt-3 flex flex-col gap-2">
            <input placeholder="Titel" class="input-field" value={task.title} 
              on:input={(e) => updateTask(i, t => ({ ...t, title: e.target.value }))}/>
            <textarea placeholder="Beschrijving" class="input-field h-20 resize-none" 
              on:input={(e) => updateTask(i, t => ({ ...t, description: e.target.value }))}>{task.description}</textarea>
            
            <select class="input-field" value={task.status} on:change={(e) => updateTask(i, t => ({ ...t, status: e.target.value }))}>
              <option>Nog niet gestart</option>
              <option>In progress</option>
              <option>Voltooid</option>
            </select>

            <div class="flex flex-wrap gap-2">
              {#each ['Emma','Liam','Sophie'] as person}
                <label class="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={task.people.includes(person)}
                    on:change={(e) => updateTask(i, t => ({
                      ...t,
                      people: e.target.checked ? [...t.people, person] : t.people.filter(p => p !== person)
                    }))}/>
                  {person}
                </label>
              {/each}
            </div>

            <div class="flex flex-col gap-2">
              {#each task.subtasks as subtask, idx}
                <div class="flex gap-2 items-center">
                  <input class="input-field flex-1" value={task.subtasks[idx]} 
                    on:input={(e) => updateTask(i, t => {
                      const copy = [...t.subtasks]; copy[idx] = e.target.value;
                      return {...t, subtasks: copy};
                    })}/>
                  <button class="btn-danger" on:click={() => updateTask(i, t => ({...t, subtasks: t.subtasks.filter((_, sidx) => sidx !== idx)}))}>x</button>
                </div>
              {/each}
              {#if task.subtasks.length < 3}
                <button class="btn-primary text-sm" on:click={() => updateTask(i, t => ({...t, subtasks: [...t.subtasks, '']}))}>+ Subtaak</button>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .task-card { cursor: grab; transition: transform 0.2s; }
  .task-card:active { cursor: grabbing; transform: scale(1.02); }

  .btn-primary {
    background-color: #f60a06; 
    color: white; 
    padding: 0.4rem 0.8rem; 
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  .btn-primary:hover { background-color: #2563eb; }

  .btn-danger {
    background-color: #ef4444;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  .btn-danger:hover { background-color: #dc2626; }

  .input-field {
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    width: 100%;
  }

  /* scrollbar styling for horizontal scroll */
  .task-pool > div.overflow-x-auto::-webkit-scrollbar { height: 6px; }
  .task-pool > div.overflow-x-auto::-webkit-scrollbar-thumb { background-color: #93c5fd; border-radius: 3px; }
</style>
