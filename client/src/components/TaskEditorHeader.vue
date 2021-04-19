<template>
  <header>
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>Task Editor</h1>
    </div>
    <br />
    <div>
      <div class="form-group row">
        <label for="workspace_id" class="col-sm-2 col-form-label"
          >Project</label
        >
        <div class="col-sm-3">
          <select id="workspace_id" v-model="workspace_id" class="form-control">
            <option :key="index" v-for="(project, index) in projects">
              {{ project }}
            </option>
          </select>
        </div>
        <button @click="getTasks" class="btn btn-primary">
          Get Tasks
        </button>
        <div class="col-sm-2">
          <!-- -->
        </div>
        <div class="col-sm-3">
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