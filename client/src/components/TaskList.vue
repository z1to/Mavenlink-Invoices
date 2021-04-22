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
            <div v-if="this.isEditing == false">
              Task title: {{ task.title }}
            </div>
            <div v-else>
              <label for=""
                >Task Title: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;</label
              >
              <input
                v-model="task.title"
                type="text"
                placeholder="New Task Title"
                size="20"
              />
            </div>
            <p></p>
            <div v-if="isEditing == false">
              Task description: {{ task.description }}
            </div>
            <div v-else>
              <label for="">Task Description: &nbsp; </label>
              <input
                v-model="task.description"
                type="text"
                placeholder="New Task Description"
                size="20"
              />
            </div>
          </div>
          <div class="col-1 text-left border-bottom">
            <div v-if="isEditing == false">
              {{ task.hours }}
            </div>
            <input
              v-else
              v-model="task.hours"
              type="text"
              placeholder="Hours"
              size="5"
            /><br />
          </div>
          <div class="col-1 text-left border-bottom">
            <div v-if="isEditing == false">
              {{ task.rate }}
            </div>
            <input
              v-else
              v-model="task.rate"
              type="text"
              placeholder="Rate"
              size="5"
            /><br />
          </div>
          <div class="col-1 text-left border-bottom">
            {{parseInt(task.hours)*parseInt(task.rate)}}
          </div>
          <div class="col-1 text-left border-bottom">
            <button
              v-if="isEditing == false"
              @click="isEditing = true"
              class="btn btn-success"
            >
              Edit
            </button>
            <button v-else @click="isEditingToggle()" class="btn btn-success">
              Save
            </button>
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
      newTaskHours: 0,
      newTaskRate: 0,
      editTaskName: null,
      editTaskDesc: null,
      editTaskHours: null,
      editTaskRate: null,
      isEditing: false,
      payTotal: 0,
    };
  },
  methods: {
    calculateTotal() {
      return (this.payTotal =
        parseInt(this.newTaskHours) * parseInt(this.newTaskRate));
    },
    isEditingToggle() {
      if (this.isEditing) {
        this.isEditing = !this.isEditing;
        this.$emit(
          "updateTask",
          this.editTaskName,
          this.editTaskDesc,
          this.editTaskHours,
          this.editTaskRate
        );
      }
    },
  },
  props: {
    tasks: Object,
  },
  components: {},
  emits: ["get-tasks", "deleteTask", "updateTask"],
};
</script>
