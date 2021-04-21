<template>
  <header>
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>Create Invoice</h1>
    </div>
    <br />
    <div>
      <div class="form-group row was-validated">
        <label for="workspace_id" class="col-sm-2 col-form-label"
          >Project</label
        >
        <div class="col-sm-3">
          <select
            id="workspace_id"
            v-model="selected"
            class="form-control is-invalid"
            required
          >
            <option
              :key="index"
              :value="project.id"
              v-for="(project, index) in projects"
            >
              {{ project.title }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div class="form-group row was-validated">
          <label
            id="created_after"
            for="created_after"
            class="col-sm-2 col-form-label"
            >From</label
          >
          <div class="col-sm-3">
            <input
              class="form-control is-invalid"
              type="date"
              v-model="created_after"
              required
            />
          </div>
        </div>
        <div class="form-group row was-validated">
          <label
            id="created_before"
            for="created_before"
            class="col-sm-2 col-form-label"
            >To</label
          >
          <div class="col-sm-3">
            <input
              class="form-control is-invalid"
              type="date"
              v-model="created_before"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2">
            <button
              class="btn btn-primary"
              @click="onImportTime(selected, created_after, created_before)"
            >
              Import Time
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "CreateInvoiceHeader",
  props: {
    projects: Array,
  },
  data() {
    return { selected: "" };
  },
  methods: {
    onImportTime(workspace_id, created_after, created_before) {
      this.$emit(
        "import-time-entries",
        workspace_id,
        created_after,
        created_before
      );
    },
  },
  emits: ["import-time-entries"],
};
</script>
