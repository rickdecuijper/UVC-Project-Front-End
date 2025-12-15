<script>
  import CalendarGrid from '$lib/components/calendar/CalendarGrid.svelte';
  import NewTasksSection from '$lib/components/tasks/NewTasksSection.svelte';
  import AchtergrondUploader from '$lib/components/schatkaart/AchtergrondUploader.svelte';
</script>

<div class="p-4 sm:p-8 bg-gray-50 min-h-screen relative">
    
    <div class="flex justify-end mb-4 z-50 relative"> 
        <AchtergrondUploader on:upload={() => { /* Stil succes! */ }} />
    </div>

    <CalendarGrid /> 
    <NewTasksSection />
  
</div>