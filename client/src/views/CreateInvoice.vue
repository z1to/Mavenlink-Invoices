<template>
  <div class="create-invoice">
    <CreateInvoiceHeader
      @import-time-entries="importTimeEntries"
      :projects="projects"
    />
    <TimeEntries :timeEntries="timeEntries" />
  </div>
</template>

<script>
import CreateInvoiceHeader from "@/components/CreateInvoiceHeader.vue";
import axios from 'axios';
import TimeEntries from "@/components/TimeEntries.vue";

export default {
  name: "CreateInvoice",
  components: {
    CreateInvoiceHeader,
    TimeEntries,
  },
  data() {
    return {
      timeEntries: [],
      projects: [],
    };
  },
  methods: {
    importTimeEntries(workspace_id, created_after, created_before) {
      console.log(workspace_id);
      console.log(created_after);
      console.log(created_before);
      axios({
          method: 'get',
          url: 'http://localhost:5000/time',
          params: {
            workspace_id: workspace_id,
            created_after: created_after,
            created_before: created_before
          }
      }).then(response=>console.log(response)).catch(error=>console.log(error));
    }
  },
  created() {
    this.timeEntries = [{ text: "Hi" }, { text: "Hey" }];
    this.projects = ["35576775", "35576725"];
  },
};
</script>