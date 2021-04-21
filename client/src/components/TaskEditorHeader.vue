<template>
  <header>
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>Task Editor</h1>
    </div>
    <br />
    <div>
      <div class="form-group row">
        <div class="col-sm-4">
          <form action="">
            <label for="">Name: &nbsp; </label>
             <input type="text" id="tname" name="tname" placeholder="New Task Name" size="25"><br>
           </form>
        </div>
        <div class="col-sm-4">
          <form action="">
             <label for="">Description: &nbsp; </label>
             <input type="text" id="tdesc" name="tdesc" placeholder="New Task Description" size="25"><br>
           </form>
        </div>
         <div class="col-sm-4">
            <button @click="createTask" class="btn btn-primary">
          Create New Mavenlink Task
        </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TaskEditorHeader",
  data() {
    return { selected: "" };
  },
  methods: {
    getTasks(workspace_id) {
      this.$emit(
        "get-tasks",
        workspace_id
      );
    },
  },
  emits: ["get-tasks"],
};
</script>