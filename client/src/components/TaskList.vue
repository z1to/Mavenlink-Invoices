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
        class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white text-center">
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
            <input v-model="newTaskHours" type="text" id="fname" name="fname" placeholder="Hours" size="5"><br>
          </div>
          <div class="col-1 text-left border-bottom">
            <input v-model="newTaskRate" type="text" id="fname" name="fname" placeholder="Rate" size="5"><br>
          </div>
          <div class="col-1 text-left border-bottom">
            $0.00
          </div>
          <div class="col-1 text-left border-bottom">
            <button @click="updateTask()" class="btn btn-success">
              Edit
            </button>
          </div>
          <div class="col-1 text-left border-bottom">
            <button @click="deleteTask(task.id)" class="btn btn-danger">
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
  data() {
    return { 
      isEditing: false,
      payTotal: 0
    };
  },
  methods: {
    calculateTotal() {
      this.payTotal = parseInt(this.newTaskHours) * parseInt(this.newTaskRate)
    }
  },
  props: {
    tasks: Object,
  },
  components: {
  },
  emits: ["get-tasks"],
};
</script>
