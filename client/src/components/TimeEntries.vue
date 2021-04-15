<template>
  <div>
    <div :key="index" v-for="(result, index) in results">
      <TimeEntry :timeEntry="timeEntries[result.id]" :task="tasks[timeEntries[result.id].story_id]" :rate="rates[0]"/>
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
    rates: Array
  },
  components: {
    TimeEntry,
  },
};
</script>
