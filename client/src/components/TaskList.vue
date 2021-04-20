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
    <div :key="index" v-for="(task,index) in tasks">
      <Task
        :task="tasks"
      />
    </div>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Task",
  props: {
    tasks: Object,
    results: Array,
    rates: Array,
  },
  components: {
    Task,
  },
  emits: ["get-tasks"],
};
</script>
