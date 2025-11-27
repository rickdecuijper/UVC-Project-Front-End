<script>
  import CalendarHeader from './CalendarHeader.svelte';
  import CalendarCell from './CalendarCell.svelte';
</script>

<section class="bg-white p-4 rounded-xl shadow-lg mb-12">
  <CalendarHeader />
  
  <div class="grid grid-cols-8 gap-1 mb-1">
    <div class="col-span-1 p-2 bg-gray-50"></div>
    <div class="col-span-1 bg-red-400 text-white rounded-t-lg text-center font-bold p-2">ma</div>
    <div class="col-span-1 bg-orange-500 text-white rounded-t-lg text-center font-bold p-2">di</div>
    <div class="col-span-1 bg-green-500 text-white rounded-t-lg text-center font-bold p-2">wo</div>
    <div class="col-span-1 bg-blue-600 text-white rounded-t-lg text-center font-bold p-2">do</div>
    <div class="col-span-1 bg-blue-500 text-white rounded-t-lg text-center font-bold p-2">vr</div>
    <div class="col-span-1 bg-purple-500 text-white rounded-t-lg text-center font-bold p-2">za</div>
    <div class="col-span-1 bg-pink-500 text-white rounded-t-lg text-center font-bold p-2">zo</div>
  </div>

  <div class="grid grid-cols-8 gap-1 mb-1">
    <div class="col-span-1 bg-yellow-400 p-2 text-white rounded-l-lg flex items-center justify-center">
      <span class="text-xs font-bold">Ochtend</span>
    </div>
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
  </div>

  <div class="grid grid-cols-8 gap-1">
    <div class="col-span-1 bg-red-500 p-2 text-white rounded-l-lg flex items-center justify-center">
      <span class="text-xs font-bold">Middag</span>
    </div>
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
    <CalendarCell />
  </div>
</section>