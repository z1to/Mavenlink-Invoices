<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white"
      ></div>
      <div class="col-5 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Description
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Hours
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Rate
      </div>
      <div class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Total
      </div>
      <div
        class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white text-left"
      >
        Actions
      </div>
    </div>
    <br />
    <div :key="index" v-for="(result, index) in results">
      <Task
        @delete-time="$emit('delete-time', result.id)"
        :timeEntry="timeEntries[result.id]"
        :task="tasks[timeEntries[result.id].story_id]"
        :rate="rates[0]"
        :timeEntryId="result.id"
      />
    </div>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Task",
  props: {
    
    results: Array,
    rates: Array,
  },
  components: {
    Task,
  },
  emits: ["delete-time"],
};
</script>
