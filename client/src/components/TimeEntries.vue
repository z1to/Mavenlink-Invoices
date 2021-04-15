<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 font-weight-bold p-3 mb-2 bg-secondary text-white">Date Performed</div>
      <div class="col-5 font-weight-bold p-3 mb-2 bg-secondary text-white">Description</div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">Hours</div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">Rate</div>
      <div class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white">Total</div>
    </div>
    <br />
    <div :key="index" v-for="(result, index) in results">
      <TimeEntry
        :timeEntry="timeEntries[result.id]"
        :task="tasks[timeEntries[result.id].story_id]"
        :rate="rates[0]"
      />
    </div>
  </div>
</template>

<script>
import TimeEntry from "./TimeEntry";

export default {
  name: "TimeEntries",
  props: {
    timeEntries: Object,
    results: Array,
    tasks: Object,
    rates: Array,
  },
  components: {
    TimeEntry,
  },
};
</script>
