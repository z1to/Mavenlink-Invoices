<template>
  <header>
    <h1>Create Invoice Header</h1>
    <label for="workspace_id">Project: </label>
    <select v-model="workspace_id">
      <option :key="index" v-for="(project, index) in projects">{{project}}</option>
    </select>
    <br>
    <label for="created_after">From: </label>
    <input type="date" v-model="created_after"/>
    <br>
     <label for="created_before">To: </label>
    <input type="date" v-model="created_before"/>
    <br>
    <button @click="onImportTime(workspace_id, created_after, created_before)">Import Time</button>
    <button>Create Invoice</button>
  </header>
</template>

<script>
export default {
  name: "CreateInvoiceHeader",
  props: {
    projects: Array,
  },
  data() {
      return {selected: ""}
  },
  methods: {
    onImportTime(workspace_id, created_after, created_before) {
      this.$emit('import-time-entries', workspace_id, created_after, created_before);
    },
  },
  emits: ['import-time-entries']
};
</script>