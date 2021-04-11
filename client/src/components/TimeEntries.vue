<template>
  <div>
    <div :key="timeEntry.text" v-for="timeEntry in timeEntries">
      <TimeEntry :timeEntry="timeEntry" />
    </div>
  </div>
</template>

<script>
import TimeEntry from "./TimeEntry";
export default {
  name: "TimeEntries",
  props: {
    timeEntries: Array
  },
  components: {
    TimeEntry,
  },
};
</script>
