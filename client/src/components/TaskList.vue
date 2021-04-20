<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Description
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Hours
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Rate
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
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
      <div class="container-fluid">
    <div class="row">
      <div class="col-1 border-bottom">
      
      </div>
      <div class="col-6 text-left border-bottom">
        <p>Task title: {{task.title}}</p>
        <p>Task description: {{ task.description }}</p>
      </div>
      <div class="col-1 text-left border-bottom">
        Hours
      </div>
      <div class="col-1 text-left border-bottom">
        Rate
      </div>
      <div class="col-1 text-left border-bottom">
        Total
      </div>
      <div
        class="col-2 text-left border-bottom"
      >
        Actions
      </div>
    </div>
    <br />
  </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Task",
  props: {
    tasks: Object,
    results: Array,
    rates: Array,
  },
  components: {
  },
  emits: ["get-tasks"],
};
</script>
