<template>
  <header>
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>Task Editor</h1>
    </div>
    <br />
    <div>
      <div class="form-group row">
        <div class="col-sm-4">
          
        </div>
        
        <div class="col-sm-4">
           <button @click="createTask" class="btn btn-primary">
          Create New Mavenlink Task
        </button>
        </div>
         <div class="col-sm-4">
          <button @click="getTasks" class="btn btn-primary">
          Get Tasks
        </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TaskEditorHeader",
  props: {
    projects: Array,
  },
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