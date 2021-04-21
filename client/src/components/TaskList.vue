<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Description
      </div>
      <div
        class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white text-left"
      >
        Hours
      </div>
      <div
        class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white text-left"
      >
        Rate
      </div>
      <div
        class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white text-left"
      >
        Total
      </div>
      <div
        class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white text-center"
      >
        Actions
      </div>
    </div>
    <br />
    <div :key="index" v-for="(task, index) in tasks">
      <div class="container-fluid">
        <div class="row">
          <div class="col-1 border-bottom"></div>
          <div class="col-6 text-left border-bottom">
            <div v-if="isEditing==false">
              Task title: {{ task.title }}
            </div>
            <div v-else>
              <input
              v-model="editTaskName"
              type="text"
              placeholder="New Task Name"
              size="20"
            />
            </div>
            <p></p>
            <div v-if="isEditing==false">
              Task description: {{ task.description }}
            </div>
            <div v-else>
              <input
              v-model="editTaskDesc"
              type="text"
              placeholder="New Task Description"
              size="20"
            />
            </div>
          </div>
          <div class="col-1 text-left border-bottom">
            <div v-if="isEditing==false">
              {{task.hours}}
            </div>
            <input
              v-else
              v-model="newTaskHours"
              type="text"
              placeholder="Hours"
              size="5"
            /><br />
          </div>
          <div class="col-1 text-left border-bottom">
            <div v-if="isEditing==false">
              {{task.rate}}
            </div>
            <input
              v-else
              v-model="newTaskRate"
              type="text"
              placeholder="Rate"
              size="5"
            /><br />
          </div>
          <div class="col-1 text-left border-bottom">$0.00</div>
          <div class="col-1 text-left border-bottom">
            <button v-if="isEditing==false" @click="isEditing=true" class="btn btn-success">Edit</button>
            <button v-else @click="isEditing=false" class="btn btn-success">Save</button>
          </div>
          <div class="col-1 text-left border-bottom">
            <button
              @click="$emit('deleteTask', task.id)"
              class="btn btn-danger"
            >
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
      newTaskHours: null,
      newTaskRate: null,
      isEditing: false,
      payTotal: 0,
    };
  },
  methods: {
    calculateTotal() {
      this.payTotal = parseInt(this.newTaskHours) * parseInt(this.newTaskRate);
    },
  },
  props: {
    tasks: Object,
  },
  components: {},
  emits: ["get-tasks", "deleteTask"],
};
</script>
