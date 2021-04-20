<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Description
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white text-left">
        Hours
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white text-left">
        Rate
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white text-left" >
        Total
      </div>
      <div
        class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white text-center"
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
          <div class="col-1 text-left border-bottom">
            <button @click="editTasks" class="btn btn-success">
              Edit
            </button>
          </div>
          <div class="col-1 text-left border-bottom">
            <button @click="deleteTask" class="btn btn-danger">
              Delete
            </button>
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
