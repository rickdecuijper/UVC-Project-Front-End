<script>
  import { createEventDispatcher } from 'svelte';

  export let tasks; // writable store
  export let peopleOptions = ['Emma','Liam','Sophie'];

  const dispatch = createEventDispatcher();

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

  let newTask = structuredClone(emptyTask);
  let showForm = false;
  let editingTaskId = null;

  /* -------------------------
     Add / Edit Task
  ------------------------- */
  function addTask(){
    if (!newTask.title.trim()) return;

    tasks.update(all => [
      ...all,
      { ...structuredClone(newTask), id: crypto.randomUUID() }
    ]);

    resetForm();
  }

  function saveTask(){
    if (!newTask.title.trim()) return;

    tasks.update(all =>
      all.map(t => t.id === editingTaskId ? structuredClone(newTask) : t)
    );

    resetForm();
  }

  function editTask(task){
    newTask = structuredClone(task);
    editingTaskId = task.id;
    showForm = true;
  }

  function deleteTask(id){
    tasks.update(all => all.filter(t => t.id !== id));
  }

  function resetForm(){
    newTask = structuredClone(emptyTask);
    editingTaskId = null;
    showForm = false;
  }

  /* -------------------------
     Subtasks
  ------------------------- */
  function addSubtask(){
    if (newTask.subtasks.length < 3) {
      newTask.subtasks = [...newTask.subtasks, ''];
    }
  }

  function removeSubtask(i){
    newTask.subtasks = newTask.subtasks.filter((_, idx) => idx !== i);
  }

  /* -------------------------
     Drag & Drop
  ------------------------- */
  function handleDragStart(task){
    window.__dragTask = structuredClone(task);
    window.__dragSource = 'pool';
  }

  function allowDrop(e){
    e.preventDefault();
  }

  function handleDrop(){
    const task = window.__dragTask;
    const source = window.__dragSource;

    if (!task || source !== 'calendar') return;

    dispatch('unscheduleTask', task);

    window.__dragTask = null;
    window.__dragSource = null;
  }
</script>

<style>
  .pool {
    border: 2px dashed #c4b5fd;
    border-radius: 16px;
    padding: 12px;
    background: #faf5ff;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .task {
    background: #ede9fe;
    border-radius: 12px;
    padding: 8px;
    cursor: grab;
  }
  .subtask-btn {
    font-size: 0.875rem;
    color: #7c3aed;
    cursor: pointer;
  }
  .remove-btn {
    background: red;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0 6px;
    cursor: pointer;
  }
</style>

<div class="pool" on:dragover={allowDrop} on:drop={handleDrop}>
  <div class="flex justify-between items-center">
    <h3 class="font-bold text-lg">Takenpool</h3>
    <button on:click={() => showForm = !showForm}>
      {showForm ? 'Sluiten' : '+ Nieuwe taak'}
    </button>
  </div>

  {#if showForm}
    <div class="flex flex-col gap-2 border-t pt-2">
      <input bind:value={newTask.title} placeholder="Taaknaam" class="p-2 border rounded-lg" />
      <textarea bind:value={newTask.description} placeholder="Beschrijving" class="p-2 border rounded-lg" rows="2" />

      <select bind:value={newTask.status} class="p-2 border rounded-lg">
        <option>Nog niet gestart</option>
        <option>In progress</option>
        <option>Voltooid</option>
      </select>

      <label>Personen:</label>
      <div class="flex flex-wrap gap-2">
        {#each peopleOptions as p}
          <label class="flex items-center gap-1">
            <input
              type="checkbox"
              checked={newTask.people.includes(p)}
              on:change={(e) => {
                if (e.target.checked) newTask.people = [...newTask.people, p];
                else newTask.people = newTask.people.filter(x => x !== p);
              }}
            />
            {p}
          </label>
        {/each}
      </div>

      <label>Subtaken:</label>
      {#each newTask.subtasks as st, i}
        <div class="flex gap-2 items-center">
          <input
            bind:value={newTask.subtasks[i]}
            placeholder="Subtaak..."
            class="flex-1 p-2 border rounded-lg"
          />
          <button on:click={() => removeSubtask(i)} class="remove-btn">x</button>
        </div>
      {/each}

      {#if newTask.subtasks.length < 3}
        <button on:click={addSubtask} class="subtask-btn">+ Subtaak</button>
      {/if}

      <div class="flex gap-2">
        <button
          on:click={editingTaskId ? saveTask : addTask}
          class="bg-purple-600 text-white px-4 py-1 rounded-lg"
        >
          {editingTaskId ? 'Opslaan' : 'Toevoegen'}
        </button>

        {#if editingTaskId}
          <button on:click={resetForm} class="px-4 py-1 border rounded-lg">
            Annuleren
          </button>
        {/if}
      </div>
    </div>
  {/if}

  {#each $tasks.filter(t => !t.date || !t.time) as task (task.id)}
    <div
      class="task flex justify-between items-start gap-2"
      draggable="true"
      on:dragstart={() => handleDragStart(task)}
    >
      <div>
        <div class="font-semibold">{task.title}</div>
        <div class="text-xs text-gray-600">{task.status}</div>
      </div>

      <div class="flex gap-1">
        <button
          class="text-xs px-2 py-1 bg-blue-500 text-white rounded"
          draggable="false"
          on:click|stopPropagation={() => editTask(task)}
        >
          Edit
        </button>

        <button
          class="text-xs px-2 py-1 bg-red-500 text-white rounded"
          draggable="false"
          on:click|stopPropagation={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  {/each}
</div>
