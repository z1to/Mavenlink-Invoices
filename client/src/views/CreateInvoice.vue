<template>
  <div class="create-invoice">
    <CreateInvoiceHeader
      @import-time-entries="importTimeEntries"
      :projects="projects"
    />
    <TimeEntries
      :timeEntries="timeEntries"
      :tasks="tasks"
      :results="results"
      :rates="rates"
    />
    <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <h5>Total: {{ total }} USD</h5>
    </div>
    <div class="row d-flex justify-content-center">
      <button class="btn btn-primary">Create Invoice</button>
    </div>
    <br>
    </div>
  </div>
</template>

<script>
import CreateInvoiceHeader from "@/components/CreateInvoiceHeader.vue";
import axios from "axios";
import TimeEntries from "@/components/TimeEntries.vue";
import numeral from "numeral";

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
      tasks: [],
      results: [],
      rates: [10],
    };
  },
  computed: {
    total: function () {
      var totalPerTimeEntry = this.results.map(
        (result) =>
          (this.timeEntries[result.id].time_in_minutes / 60) * this.rates[0]
      );
      if (totalPerTimeEntry.length > 0) {
        return numeral(totalPerTimeEntry.reduce((prev, current) => prev + current)).format("0,0");
      }
      return 0;
    },
  },
  methods: {
    importTimeEntries(workspace_id, created_after, created_before) {
      axios({
        method: "get",
        url: "http://localhost:5000/tasks/time",
        params: {
          workspace_id: workspace_id,
          created_after: created_after,
          created_before: created_before,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.results = response.data.results;
          this.timeEntries = response.data.time_entries;
          this.tasks = response.data.stories;
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.timeEntries = [{ text: "Hi" }, { text: "Hey" }];
    this.projects = ["35576775", "35576725"];
  },
};
</script>