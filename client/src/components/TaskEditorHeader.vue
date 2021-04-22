<template>
  <header>
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>Task Editor</h1>
    </div>
    <br />
    <div>
      <div class="form-group row">
        <div class="col-sm-3">

        </div>
        <div class="col-sm-6">
          <form action="">
            <label for="">Name: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
            <input
              v-model="newTaskName"
              type="text"
              id="tname"
              name="tname"
              placeholder="New Task Name"
              size="25"
            /><br />
            <label for="">Description: &nbsp; </label>
            <input
              v-model="newTaskDescription"
              type="text"
              id="tdesc"
              name="tdesc"
              placeholder="New Task Description"
              size="25"
            /><br />
          </form>
          <form action="">
            <label for="">Rate: &nbsp; &nbsp; </label>
            <input
              v-model="newTaskRate"
              type="number"
              id="trate"
              name="trate"
              placeholder="New Rate"
              size="10"
            /><br />
          </form>
          <button
            @click="
              $emit('createTask', '35576725', newTaskName, newTaskDescription, newTaskRate)
            "
            class="btn btn-primary"
          >
            Create New Mavenlink Task
          </button>
        </div>
        <div class="col-sm-3">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TaskEditorHeader",
  data() {
    return {
      selected: "",
      newTaskName: "",
      newTaskDescription: "",
      newTaskRate: "",
    };
  },
  methods: {
    getTasks() {
      this.$emit("get-tasks");
    },
  },
  emits: ["get-tasks", "createTask"],
};
</script>
